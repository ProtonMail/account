import { createStore } from 'unistore/full/preact';

import authActions from '../actions/authentication';
import settingsActions from '../actions/settings';

const store = createStore({
    auth: {
        isLoggedIn: false,
        user: {},
        step: 'login',
        twoFactorResponse: {}
    },
    settings: {
        addU2FKey: {},
        reset2FARecoveryCodes: {}
    }
});

export const actions = (store) => ({
    ...authActions(store),
    ...settingsActions(store)
});

export default store;
