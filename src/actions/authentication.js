import { route } from 'preact-router';
import { c, addLocale, useLocale } from 'c-3po';
import { verify } from 'frontend-commons/src/api/paymentsApi';
import { loadExtendedConfig } from 'frontend-commons/src/user/model';
import * as userConnector from 'frontend-commons/src/auth/userConnector';
import appProvider from 'frontend-commons/src/appProvider';
import { isVPN } from 'frontend-commons/src/utils/appType';
import { signU2F } from '../helpers/u2f';

import toActions from '../helpers/toActions';
import { toState } from '../helpers/stateFormatter';


/**
 * @link { https://github.com/developit/unistore#usage }
 */
const actions = (store) => {
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

    /**
     * Logins using a U2F key.
     * @param state
     * @returns {Promise<*>} calls @link{login2FA}
     */
    async function loginU2F(state) {
        let result;
        try {
            result = await signU2F(state.auth.twoFactorData.U2F);
        } catch (e) {
            if (!e.ErrorCode == null) throw e;
            return store.setState(toState(state, 'auth', {
                twoFactorResponse: {
                    success: false,
                    U2FResponse: e
                }
            }));
        }
        return login2FA(state, { U2FResponse: result });
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

    async function abortLogin(state) {
        const data = toState(state, 'auth', {
            user: {},
            isLoggedIn: false,
            step: 'login'
        });
        store.setState({ config: null });
        store.setState(data);
        route('/', data);
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
        abortLogin,
        loadAuthUser,
        loginU2F
    });
};

export default actions;
