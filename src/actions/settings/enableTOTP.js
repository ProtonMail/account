import base32 from 'hi-base32';
import webcrypto from 'frontend-commons/src/crypto/webcrypto';
import { enableTOTP as enableTOTPApi } from 'frontend-commons/src/settings/security';

import { extended, toState } from '../../helpers/stateFormatter';

export default (store) => {
    /**
     * Creates a shared secret for TOTP.
     * @param {Object} state
     * @return {Promise<void>}
     */
    async function createSharedSecret(state) {
        if (state.settings.setupTOTP && state.settings.setupTOTP.request && state.settings.setupTOTP.request.qrURI) {
            return;
        }
        const randomBytes = webcrypto.getRandomValues(new Uint8Array(20));
        const sharedSecret = base32.encode(randomBytes);

        const primaryAddress = state.auth.user.Addresses && state.auth.user.Addresses.find(({ Keys }) => !!Keys);
        const identifier = primaryAddress ? primaryAddress.Email : state.auth.user.Name + '@protonmail';

        const interval = 30;
        const digits = 6;
        const qrURI = `otpauth://totp/${identifier}?secret=${sharedSecret}&issuer=ProtonMail&algorithm=SHA1&digits=${digits}&period=${interval}`;

        store.setState(
            extended(state, 'settings.setupTOTP', {
                request: {
                    qrURI,
                    interval,
                    digits,
                    secret: sharedSecret
                },
                status: 'init'
            })
        );
    }

    /**
     * verifies the state and the code.
     * @param state
     * @param code
     * @return {Promise<boolean>} if the verification is valid
     */
    async function verifyParamsBeforeEnabling(state, code) {
        if (
            !state.settings.setupTOTP ||
            !state.settings.setupTOTP.request ||
            !state.settings.setupTOTP.request.secret
        ) {
            throw new Error('Please create a secret before enabling TOTP'); // this happens when enableTOTP is called before createSharedSecret
        }
        if (!code || code.length !== 6) {
            store.setState(
                extended(state, 'settings.setupTOTP', {
                    status: 'failure',
                    error: 'The code is not valid'
                })
            );
            return false;
        }
        return true;
    }

    /**
     * Enables TOTP on the backend side.
     * @param state
     * @param code
     * @return {Promise<void>}
     */
    async function enableTOTP(state, code) {
        if (!(await verifyParamsBeforeEnabling(state, code))) {
            return;
        }
        const data = {
            TOTPConfirmation: code,
            TOTPSharedSecret: state.settings.setupTOTP.request.secret
        };

        store.setState(extended(state, 'settings.setupTOTP', { status: 'fetching' }));
        try {
            const {
                data: { TwoFactorRecoveryCodes, UserSettings }
            } = await enableTOTPApi(data, state.scope.creds, state.scope.response);

            const newState = {
                settings: {
                    reset2FARecoveryCodes: {
                        request: {
                            codes: TwoFactorRecoveryCodes
                        }
                    },
                    setupTOTP: {
                        status: 'success',
                        request: {
                            ...state.settings.setupTOTP.request,
                            TOTPConfirmation: code
                        }
                    }
                },
                ...extended(state, 'config.settings.user', { ...UserSettings }),
                ...toState(state, 'scope', { used: true })
            };
            store.setState(newState);
        } catch (e) {
            return store.setState(
                extended(state, 'settings.setupTOTP', {
                    status: 'failure',
                    error: e
                })
            );
        }
    }

    return {
        createSharedSecret,
        enableTOTP
    };
};
