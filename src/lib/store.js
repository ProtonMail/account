import { createStore } from 'unistore/full/preact';

import authActions from '../actions/authentication';
import settingsActions from '../actions/settings';
import scopeActions from '../actions/scope';

const store = createStore({
    auth: {
        isLoggedIn: false,
        user: {},
        step: 'login',
        twoFactorResponse: {}
    },
    scope: {
        creds: null,
        response: null
    },
    settings: {
        addU2FKey: {},
        reset2FARecoveryCodes: {}
    }
});

export const actions = (store) => ({
    ...authActions(store),
    ...settingsActions(store),
    ...scopeActions(store)
});

export default store;
