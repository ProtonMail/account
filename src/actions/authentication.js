import { route } from 'preact-router';
import { c, addLocale, useLocale } from 'c-3po';
import { verify } from 'frontend-commons/src/api/paymentsApi';
import { loadExtendedConfig } from 'frontend-commons/src/user/model';
import * as userConnector from 'frontend-commons/src/auth/userConnector';
import appProvider from 'frontend-commons/src/appProvider';
import { isVPN } from 'frontend-commons/src/utils/appType';

import toActions from '../lib/toActions';
import { sign } from 'u2f';

/**
 * @link { https://github.com/developit/unistore#usage }
 */
const actions = (store) => {
    /**
     * Format the state and extend it as it's not recursive with unistore
     * @param  {Oject} state
     * @param  {String} key
     * @param  {Object} value
     * @return {Object}       new state
     */
    const toState = (state, key, value) => ({ [key]: { ...state[key], ...value } });

    async function loadUserConfig(state, user) {
        const { organization, payment, settings } = await loadExtendedConfig(user);
        appProvider.loadI18n(settings.user.Locale);
        store.setState({
            config: { settings, payment, organization }
        });
    }

    async function logout(state) {
        await userConnector.logout();
        const data = toState(state, 'auth', {
            user: {},
            isLoggedIn: false,
            step: 'login'
        });
        store.setState({ config: null });
        store.setState(data);
        route('/', data);
    }

    async function unlock(state, opt) {
        const { user } = await userConnector.unlock(opt);
        await loadUserConfig(state, user);
        const data = toState(state, 'auth', {
            user,
            isLoggedIn: true,
            step: ''
        });
        store.setState(data);
        route('/', data);
    }

    async function loginSignU2F (state) {
        const u2fConfig = appProvider.getConfig('u2f');

        let result = {};
        try {
            result = await sign(state.auth.twoFactorData.U2F, u2fConfig.appID, u2fConfig.timeout);
            store.setState(toState(state, 'auth', { twoFactorResponse: { success: true } }));
            return login2FA(state, { U2FResponse: result });
        } catch (e) {
            if (!e.ErrorCode) throw e;
            return store.setState(toState(state, 'auth', { twoFactorResponse: { success: false, U2FResponse: e } }));
        }
    }

    async function login2FA(state, opt) {
        const { config, user } = await userConnector.login2FA(opt);

        if (config) {
            if (config.isUnlockable) {
                return store.setState(
                    toState(state, 'auth', {
                        user,
                        isLoggedIn: false,
                        step: 'unlock'
                    })
                );
            }
        }

        const data = toState(state, 'auth', {
            user,
            isLoggedIn: true,
            step: ''
        });
        store.setState(data);
        await loadUserConfig(state, user);
        route('dashboard', data);
    }

    async function login(state, opt) {
        console.log('login.load', opt);
        const { config, user } = await userConnector.login(opt);
        console.log('login.success', { config, user, opt });

        if (config) {
            const data = { user, isLoggedIn: false };

            if (config.is2FA) {
                data.step = '2fa';
                data.twoFactorData = { ...config.twoFactorData };
            }

            if (config.isUnlockable) {
                data.step = 'unlock';
            }
            return store.setState(toState(state, 'auth', data));
        }

        store.setState(
            toState(state, 'auth', {
                user,
                isLoggedIn: true,
                step: ''
            })
        );

        !opt.raw && (await loadUserConfig(state, user));
        route('/dashboard', store.getState());
    }

    async function loadAuthUser(state) {
        appProvider.setAppI18n(addLocale, useLocale);
        const data = await userConnector.reloadAuth();
        const isLoggedIn = !!Object.keys(data.user).length;
        store.setState(
            toState(state, 'auth', {
                ...data,
                isLoggedIn
            })
        );

        isLoggedIn && (await loadUserConfig(state, data.user));
    }

    return toActions({
        loadUserConfig,
        login,
        logout,
        unlock,
        login2FA,
        loadAuthUser,
        loginSignU2F
    });
};

export default actions;
