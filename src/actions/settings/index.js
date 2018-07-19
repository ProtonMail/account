import appProvider from 'frontend-commons/src/appProvider';

import addU2FKeyActions from './addU2FKey';

import {
    disableTOTP as disableTOTPApi,
    disableTwoFactor as disableTwoFactorApi,
    removeU2FKey,
    resetRecoveryCodes
} from 'frontend-commons/src/settings/security';

import toActions from '../../helpers/toActions';
import { error, success } from '../../helpers/notification';
import { register } from 'u2f';
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

    return toActions({
        reset2FARecoveryCodesCheckNewCode,
        reset2FARecoveryCodesInit,
        resetStore: resetActionsInStore,
        deleteU2FKey,
        disableTOTP,
        disableTwoFactor,
        ...addU2FKeyActions(store)
    });
};

export default actions;

