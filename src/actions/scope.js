import { signU2F } from '../helpers/u2f';
import toActions from '../helpers/toActions';
import { authInfo } from 'frontend-commons/src/crypto/srp';
import { toState, extended } from '../helpers/stateFormatter';

/**
 * @link{https://github.com/developit/unistore#usage}
 */
export default (store) => {

    /**
     * initializate the unscope process.
     * @param state
     * @returns {Promise<void>}
     */
    async function unscopeInit(state) {
        if (state.scope.used) {
            return;
        }
        if (!state.scope.response) {
            const authData = await authInfo(state.auth.Name);
            store.setState(toState(state, 'scope', { response: authData, creds: {} }));
        }
    }

    /**
     * Sets the password (and the twoFactorCode, if given)
     * @param state
     * @param {Object} opt
     * @param {string} opt.password - the password
     * @param {?string} twoFactorCode - the 2FA code (TOTP or recovery code).
     */
    async function unscopePassword(state, { password, twoFactorCode = undefined }) {
        const creds = { password };
        if (twoFactorCode !== undefined) {
            creds.twoFactorCode = twoFactorCode;
        }

        store.setState(extended(state, 'scope.creds', creds));
    }

    /**
     * sends and store a sign request to the U2F API.
     * @param state
     * @returns {Promise<void>}
     */
    async function unscopeU2F(state) {
        store.setState(toState(state, 'scope', { U2FRequest: { status: 'pending', error: undefined } }));
        try {
            const response = await signU2F(state.scope.response['2FA'].U2F);
            store.setState(extended(state, 'scope.creds', { U2F: response }));
        }
        catch (e) {
            const {metaData: {code} = {}} = e;
            if (!code) {
                throw  e;
            }
            store.setState(toState(store.getState(), 'scope', { U2FRequest: { status: 'failure', error: e } }));
        }
    }

    /**
     * reset the two factor data (code and U2F).
     * @param state
     */
    async function unscopeResetTwoFactor(state) {
        return store.setState(toState(state, 'scope', {
            U2FRequest: {},
            creds: {
                password: state.scope.creds.password
            }
        }));
    }

    /**
     * reset the state for the scope
     * @param state
     */
    async function resetScopeState(state) {
        store.setState({ scope: {} });
    }

    return toActions({
        unscopeInit,
        unscopePassword,
        unscopeU2F,
        resetScopeState,
        unscopeResetTwoFactor
    });
};
