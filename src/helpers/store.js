import { createStore } from 'unistore/full/preact';
import devtools from 'unistore/devtools';

import authActions from '../actions/authentication';
import settingsActions from '../actions/settings';
import scopeActions from '../actions/scope';

export const initialState = {
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
        reset2FARecoveryCodes: {},
        setupTOTP: {}
    }
};
const store = process.env.NODE_ENV === 'production' ? createStore(initialState) : devtools(createStore(initialState));


export const actions = (store) => ({
    ...authActions(store),
    ...settingsActions(store),
    ...scopeActions(store)
});

export default store;
