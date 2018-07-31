import appProvider from 'frontend-commons/src/appProvider';
import webcrypto from 'frontend-commons/src/crypto/webcrypto';
import base32 from 'hi-base32';

import addU2FKeyActions from './addU2FKey';

import {
    disableTOTP as disableTOTPApi,
    disableTwoFactor as disableTwoFactorApi,
    removeU2FKey,
    resetRecoveryCodes,
    enableTOTP as enableTOTPApi
} from 'frontend-commons/src/settings/security';

import toActions from '../../helpers/toActions';
import { error, success } from '../../helpers/notification';
import { toState, extended } from '../../helpers/stateFormatter';


/**
 * @link { https://github.com/developit/unistore#usage }
 */
const actions = (store) => {

    /**
     * Resets the state for the actions
     * @param state
     * @param {string[]} actions - the actions to reset (for the settings store only)
     * @returns {Promise<void>}
     */
    async function resetActionsInStore(state, actions) {
        const newState = actions.reduce((acc, action) => {
            if (state.settings[action]) {
                return {
                    settings: {
                        ...state.settings,
                        ...acc.settings,
                        [action]: {}
                    }
                };
            }
            return acc;
        }, {});

        if (Object.keys(newState).length) {
            return store.setState(newState);
        }
    }

    /**
     * Initializes the reset2FARecoveryCodes procedure.
     *
     * Fetches new codes if none are already in the state.
     * @param state
     * @returns {Promise<void>}
     */
    async function reset2FARecoveryCodesInit(state) {
        const { settings: { reset2FARecoveryCodes: { request: { codes } = {} } } } = state;

        try {
            if (!codes || !codes.length) {
                const response = await resetRecoveryCodes(state.scope.creds, state.scope.response);
                store.setState(toState(state, 'settings', toState(state.settings, 'reset2FARecoveryCodes', {
                    request: { codes: response.data.TwoFactorRecoveryCodes }
                })));
            }
        } catch (e) {
            store.setState(extended(state, 'settings.reset2FARecoveryCodes', { error: e }));
        }
    }

    /**
     * Verifies a given code is in the new codes.
     * @param state
     * @param {string} code - the code to verify.
     * @returns {Promise<void>}
     */
    async function reset2FARecoveryCodesCheckNewCode(state, code) {
        const { settings: { reset2FARecoveryCodes: { request: { codes } = {} } } } = state;

        return store.setState(extended(state, 'settings.reset2FARecoveryCodes', {
            result: codes.indexOf(code) >= 0,
            response: { code }
        }));
    }

    /**
     * Updates the settings from the store.
     * @param state
     * @param result
     * @private
     */
    function updateUserSettingsFromResponse(state, result) {
        store.setState(extended(state, 'config.settings.user', { ...result.data.UserSettings }));
    }

    /**
     * Sends a delete request to the API.
     * @param state
     * @param {Object} u2fKey - the U2F Key to delete.
     * @param {String} u2fKey.KeyHandle - the key handle of the U2F Key.
     * @returns {Promise<void>}
     */
    async function deleteU2FKey(state, u2fKey) {
        try {
            updateUserSettingsFromResponse(
                state,
                await removeU2FKey(u2fKey.KeyHandle, state.scope.creds, state.scope.response)
            );
            success('Your key was successfully deleted');
        } catch (e) {
            error(e);
        }
    }

    async function disableTOTP(state) {
        try {
            updateUserSettingsFromResponse(
                state,
                await disableTOTPApi(state.scope.creds, state.scope.response)
            );
            success('2FA via application was successfully disabled');
        } catch (e) {
            error(e);
        }
    }

    /**
     * Disables Two Factor
     * @param state
     * @returns {Promise<void>}
     */
    async function disableTwoFactor(state) {
        try {
            updateUserSettingsFromResponse(
                state, await disableTwoFactorApi(state.scope.creds, state.scope.response)
            );
            success('Two Factor authentication was successfully disabled');
        } catch (e) {
            error(e);
        }
    }

    async function createSharedSecret(state) {
        if (state.settings.setupTOTP && state.settings.setupTOTP.request && state.settings.setupTOTP.request.qrURI) {
            return;
        }
        const randomBytes = webcrypto.getRandomValues(new Uint8Array(20));
        const sharedSecret = base32.encode(randomBytes);

        const primaryAddress = state.auth.user.Addresses && state.auth.user.Addresses.find(({Keys}) => !!Keys);
        const identifier = primaryAddress ? primaryAddress.Email : state.auth.user.Name + '@protonmail';

        const interval = 30;
        const digits = 6;
        const qrURI = `otpauth://totp/${identifier}?secret=${sharedSecret}&issuer=ProtonMail&algorithm=SHA1&digits=${digits}&period=${interval}`;

        store.setState(extended(state, 'settings.setupTOTP', {
            request: {
                qrURI,
                interval,
                digits,
                secret: sharedSecret
            },
            status: 'init'
        }));
    }

    async function enableTOTP(state, code) {
        if (!state.settings.setupTOTP | !state.settings.setupTOTP.request || !state.settings.setupTOTP.request.secret) {
            throw new Error('Please create a secret before enabling TOTP'); // this happens when enableTOTP is called before createSharedSecret
        }
        if (!code || code.length !== 6) {
            return store.setState(extended(state, 'settings.setupTOTP', {
                status: 'failure',
                error: 'The code is not valid'
            }));
        }

        const data = {
            TOTPConfirmation: code,
            TOTPSharedSecret: state.settings.setupTOTP.request.secret
        };

        store.setState(extended(state, 'settings.setupTOTP', { status: 'fetching' }));
        try {
            const { data: { TwoFactorRecoveryCodes, UserSettings } } = await enableTOTPApi(data, state.scope.creds, state.scope.response);

            const newState = {
                settings: {
                    reset2FARecoveryCodes: {
                        request: {
                            codes: TwoFactorRecoveryCodes
                        }
                    },
                    setupTOTP: {
                        status: 'success',
                        request: {
                            ...state.settings.setupTOTP.request,
                            TOTPConfirmation: code
                        }
                    }
                },
                ...extended(state, 'config.settings.user', { ...UserSettings }),
                ...toState(state, 'scope', { used: true })
            };
            store.setState(newState);
        } catch (e) {
            return store.setState(extended(state, 'settings.setupTOTP', {
                status: 'failure',
                error: e
            }));

        }
    }

    return toActions({
        reset2FARecoveryCodesCheckNewCode,
        reset2FARecoveryCodesInit,
        resetStore: resetActionsInStore,
        deleteU2FKey,
        disableTOTP,
        disableTwoFactor,
        createSharedSecret,
        enableTOTP,
        ...addU2FKeyActions(store)
    });
};

export default actions;

