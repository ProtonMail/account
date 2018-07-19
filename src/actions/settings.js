import appProvider from 'frontend-commons/src/appProvider';
import {
    addU2FKey,
    disableTOTP as disableTOTPApi,
    disableTwoFactor as disableTwoFactorApi,
    getAddU2FChallenge,
    removeU2FKey,
    resetRecoveryCodes
} from 'frontend-commons/src/settings/security';

import toActions from '../helpers/toActions';
import { error, success } from '../helpers/notification';
import { register } from 'u2f';
import { toState, extended } from '../helpers/stateFormatter';


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
    async function resetStore(state, actions) {
        let newState = state;
        for (const action of actions) {
            if (newState.settings[action]) {
                newState = { settings: { ...newState.settings, [action]: {} } };
            }
        }
        if (newState !== state) {
            return store.setState(newState);
        }
    }

    /**
     * update the `addU2FKey` state.
     * @param state
     * @param {Object} data the data to update.
     * @return {Object} new state
     * @private
     */
    function updateAddU2FKeyState(state, data) {
        store.setState(extended(state, 'settings.addU2FKey', data));
        return store.getState();
    }

    /**
     * Stores a name for a new U2F key. Erases any ongoing registration on the same browser.
     * @param state
     * @param {String} name
     */
    async function addU2FKeyName(state, name) {
        // erases any registering key. Not an issue, because the registration is supposed to be after the name setup.
        store.setState(extended(state, 'settings.addU2FKey', { response: { name }}));
    }

    /**
     * Fetches and sends a U2F register request to the U2F API.
     * @param state
     * @returns {Promise<void>}
     */
    async function addU2FKeyRegister(state) {
        const u2fConfig = appProvider.getConfig('u2f');

        const addU2FKeyState = state.settings.addU2FKey;
        const {
            status,
            errorCode,
            response: storedResponse
        } = addU2FKeyState;
        let {
            request
        } = addU2FKeyState;

        if (!(errorCode && request && Object.keys(request).length)) {
            // if failure, no need to refetch the challenge
            state = await updateAddU2FKeyState(state, { status: 'fetching' });

            request = await getAddU2FChallenge(true);
        }

        state = await updateAddU2FKeyState(state, { request, status: 'pending' });

        let u2fResponse;
        try {
            // then call U2F api
            u2fResponse = await register(request, u2fConfig.appID, u2fConfig.timeout);
        } catch (e) {
            return await updateAddU2FKeyState(state, { status: 'failure', error: e });
        }

        state = await updateAddU2FKeyState(state, { status: u2fResponse ? 'success' : 'failure' });

        // then send response...
        try {
            const result = await addU2FKey(
                {
                    Label: storedResponse.name,
                    KeyHandle: u2fResponse.KeyHandle,
                    ClientData: u2fResponse.ClientData,
                    RegistrationData: u2fResponse.RegistrationData,
                    Version: u2fResponse.Version
                },
                state.scope.creds,
                state.scope.response
            );

            const codes = result.data.TwoFactorRecoveryCodes;

            const newState = {
                ...toState(state, 'settings', {
                    addU2FKey: toState(state.settings, 'addU2FKey', { status: 'finished' }).addU2FKey,
                    reset2FARecoveryCodes: toState(state.settings, 'reset2FARecoveryCodes', {
                        request: { codes }
                    }).reset2FARecoveryCodes
                }),
                ...toState(state, 'config', toState(state.config, 'settings', toState(state.config.settings, 'user', {
                    ...result.data.UserSettings
                }))),
                ...toState(state, 'scope', { used: true })
            };

            return store.setState(
                newState
            );
        }
        catch (e) {
            await updateAddU2FKeyState(state, { status: 'failure', error: e });
            throw e;
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
            error(e.message, { error: e });
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
            error(e.message, { error: e });
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
            error(e.message, e);
        }
    }

    return toActions({
        addU2FKeyName,
        addU2FKeyRegister,
        reset2FARecoveryCodesCheckNewCode,
        reset2FARecoveryCodesInit,
        resetStore,
        deleteU2FKey,
        disableTOTP,
        disableTwoFactor
    });
};

export default actions;

