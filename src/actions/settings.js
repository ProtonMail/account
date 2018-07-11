import appProvider from 'frontend-commons/src/appProvider';
import {
    getAddU2FChallenge,
    addU2FKey,
    resetRecoveryCodes,
    removeU2FKey,
    disableTwoFactor as disableTwoFactorApi,
    disableTOTP as disableTOTPApi
} from 'frontend-commons/src/settings/security';

import toActions from '../lib/toActions';
import { register } from 'u2f';

/**
 * @link { https://github.com/developit/unistore#usage }
 */
const actions = (store) => {
    /**
     * Format the state and extend it as it's not recursive with unistore
     * @param  {Object} state
     * @param  {String} key
     * @param  {Object} value
     * @return {Object}       new state
     */
    const toState = (state, key, value) => ({ [key]: { ...state[key], ...value } });

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
     * @returns {Promise<void>}
     */
    async function updateAddU2FKeyState(state, data) {
        return store.setState(toState(state, 'settings', toState(state.settings, 'addU2FKey', data)));
    }

    /**
     * Stores a name for a new U2F key. Erases any ongoing registration on the same browser.
     * @param state
     * @param {String} name
     * @returns {Promise<void>}
     */
    async function addU2FKeyName(state, name) {
        // erases any registering key. Not an issue, because the registration is supposed to be after the name setup.
        return updateAddU2FKeyState(state, { response: { name } });
    }

    /**
     * Fetches and sends a U2F register request to the U2F API.
     * @param state
     * @returns {Promise<void>}
     */
    async function addU2FKeyRegister(state) {
        const u2fConfig = appProvider.getConfig('u2f');
        const { settings: { addU2FKey: { response: storedResponse } } } = state;

        await updateAddU2FKeyState(state, { status: 'fetching' });

        const request = await getAddU2FChallenge(true);

        await updateAddU2FKeyState(state, { status: 'pending' });

        // then call U2F api
        const u2fResponse = await register(request, u2fConfig.appID, u2fConfig.timeout);

        await updateAddU2FKeyState(state, { status: u2fResponse ? 'success' : 'failure' });

        // then send response...
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

    /**
     * Initializes the reset2FARecoveryCodes procedure.
     *
     * Fetches new codes if none are already in the state.
     * @param state
     * @returns {Promise<void>}
     */
    async function reset2FARecoveryCodesInit(state) {
        let { settings: { reset2FARecoveryCodes: { request: { codes } = {} } } } = state;

        if (!codes || !codes.length) {
            const response = await resetRecoveryCodes(state.scope.creds, state.scope.response);
            codes = response.data.TwoFactorRecoveryCodes;
        }
        store.setState(toState(state, 'settings', toState(state.settings, 'reset2FARecoveryCodes', {
            request: { codes }
        })));
    }

    /**
     * Verifies a given code is in the new codes.
     * @param state
     * @param {string} code - the code to verify.
     * @returns {Promise<void>}
     */
    async function reset2FARecoveryCodesCheckNewCode(state, code) {
        const { settings: { reset2FARecoveryCodes: { request: { codes } = {} } } } = state;

        return store.setState(toState(state, 'settings', toState(state.settings, 'reset2FARecoveryCodes', {
            result: codes.indexOf(code) >= 0,
            response: { code }
        })));
    }

    async function updateUserSettingsFromResponse(state, result) {
        return store.setState(toState(state, 'config', toState(state.config, 'settings',
            toState(state.config.settings, 'user', {
                ...result.data.UserSettings
            })
        )));
    }

    /**
     * Sends a delete request to the API.
     * @param state
     * @param {Object} u2fKey - the U2F Key to delete.
     * @param {String} u2fKey.KeyHandle - the key handle of the U2F Key.
     * @returns {Promise<void>}
     */
    async function deleteU2FKey(state, u2fKey) {
        return await updateUserSettingsFromResponse(
            state,
            await removeU2FKey(u2fKey.KeyHandle, state.scope.creds, state.scope.response)
        );
    }

    async function disableTOTP(state) {
        return await updateUserSettingsFromResponse(
            state, await disableTOTPApi(state.scope.creds, state.scope.response));
    }

    async function disableTwoFactor(state) {
        return await updateUserSettingsFromResponse(
            state, await disableTwoFactorApi(state.scope.creds, state.scope.response)
        );
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
