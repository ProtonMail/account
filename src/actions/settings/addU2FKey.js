import {
    addU2FKey,
    getAddU2FChallenge
} from 'frontend-commons/src/settings/security';

import { toState, extended } from '../../helpers/stateFormatter';
import { registerU2F } from '../../helpers/u2f';


/**
 * @link { https://github.com/developit/unistore#usage }
 */
export default (store) => {
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
     * @param {String} label
     */
    async function addU2FKeyLabel(state, label) {
        // erases any registering key. Not an issue, because the registration is supposed to be after the name setup.
        store.setState(extended(state, 'settings.addU2FKey', { response: { label } }));
    }

    /**
     * Fetches the challenge for the registration of a new key. If a response is already stored, using this one instead.
     * @return {Promise<void>}
     * @private
     */
    async function fetchU2FRegisterChallenge() {
        const state = store.getState();
        const {
            errorCode,
            request
        } = state.settings.addU2FKey;

        if (!(errorCode && request && Object.keys(request).length)) {
            await updateAddU2FKeyState(state, { status: 'fetching' });

            await updateAddU2FKeyState(state, { request: await getAddU2FChallenge(true), status: 'pending' });
        }
        else {
            // if failure, no need to refetch the challenge
            await updateAddU2FKeyState(state, {
                status: 'pending'
            });
        }
    }

    /**
     * Sends the request to the U2F API.
     * @return {Promise<void>}
     * @private
     */
    async function callU2FRegisterAPI() {
        const state = store.getState();
        const request = state.settings.addU2FKey.request;
        const u2fResponse = await registerU2F(request);

        await updateAddU2FKeyState(state, {
            u2fResponse,
            status: 'success'
        });
        return u2fResponse;
    }

    /**
     * post the U2F response to the API.
     * @return {Promise<void>}
     * @private
     */
    async function postResponse() {
        const state = store.getState();

        const {
            response,
            u2fResponse
        } = state.settings.addU2FKey;

        const data = {
            ...response,
            ...u2fResponse
        };

        const { data: { TwoFactorRecoveryCodes, UserSettings } } = await addU2FKey(
            data,
            state.scope.creds,
            state.scope.response
        );

        const newState = {
            ...toState(
                state,
                'settings',
                {
                    addU2FKey: toState(state.settings, 'addU2FKey', { status: 'finished' }).addU2FKey,
                    reset2FARecoveryCodes: toState(
                        state.settings,
                        'reset2FARecoveryCodes',
                        {
                            request: { codes: TwoFactorRecoveryCodes }
                        }
                    ).reset2FARecoveryCodes
                }
            ),
            ...extended(state, 'config.settings.user', { ...UserSettings }),
            ...toState(state, 'scope', { used: true })
        };

        return store.setState(
            newState
        );
    }

    /**
     * Fetches and sends a U2F register request to the U2F API.
     * @param state
     * @returns {Promise<void>}
     */
    async function addU2FKeyRegister(state) {
        await fetchU2FRegisterChallenge();

        try {
            await callU2FRegisterAPI();
            await postResponse();
        } catch (e) {
            return await updateAddU2FKeyState(store.getState(), { status: 'failure', error: e });
        }
    }

    return {
        addU2FKeyLabel,
        addU2FKeyRegister
    };
};
