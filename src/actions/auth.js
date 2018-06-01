import { c, addLocale, useLocale } from 'c-3po';
import { verify } from 'frontend-commons/src/api/paymentsApi';
import { loadExtendedConfig } from 'frontend-commons/src/user/model';
import * as userConnector from 'frontend-commons/src/auth/userConnector';
import log from 'frontend-commons/src/utils/log';
import appProvider from 'frontend-commons/src/appProvider';
import { isVPN } from 'frontend-commons/src/utils/appType';

export const loadUserConfig = async (state) => {
  try {
    const { organization, payment, settings } = await loadExtendedConfig(state.user);
    appProvider.loadI18n(settings.user.Locale);
    log('SETTINGS', { payment, organization, settings }, 'custom');
    return { settings, payment, organization };
  } catch (e) {
      console.error(e);
    }
};

export const logout = async (state) => {
  try {
    await userConnector.logout();
    state.isLoggedIn = false;
    state.step = 'login';
    state.user = null;
    return state;
  } catch (e) {
    console.error(e);
  }
};

export const unlock = async (data, state) => {
  try {
    const { user } = await userConnector.unlock(data);
    state.isLoggedIn = true;
    state.step = '';
    state.user = user;
    state.config = await loadUserConfig(state);
    return state;
  } catch (e) {
    console.error(e);
  }
};

export const login2FA = async (data, state) => {
  try {
    const { config, user } = await userConnector.login2FA(data);

    if (config) {

      if (config.isUnlockable) {
        state.step = 'unlock';
      }

      return state;
    }
    state.isLoggedIn = true;
    state.step = '';
    state.user = user;

    if (!state.Keys) {
      state.config = await loadUserConfig(state);
    }
    return state;
  } catch (e) {
    console.error(e);
  }
};

export const login = async (data, state) => {
  try {
    const { config, user } = await userConnector.login(data);
    log('AUTH', { config, user, data });
    if (config) {
      if (config.is2FA) {
        state.step = '2fa';
      }

      if (config.isUnlockable) {
         state.step = 'unlock';
      }

      return state;
    }

    state.isLoggedIn = true;
    state.step = '';
    state.user = user;

    if (!data.raw) {
      state.config = await loadUserConfig(state);
    }
    log('AUTH', state);
    return state;
  } catch (e) {
    console.error(e);
  }
};


export const loadAuthUser = async () => {

  try {
    appProvider.setAppI18n(addLocale, useLocale);
    const data = await userConnector.reloadAuth();

    const state = {
      isLoggedIn: false,
      step: '',
      ...{
        ...(data || {}),
        isLoggedIn: ('user' in data)
      }
    };

    if (state.user) {
      state.config = await loadUserConfig(state)
    }
    console.log('---', state)

    return state;
  } catch (e) {
    console.error(e);
    return {};
  }
};
