import webcrypto from 'frontend-commons/src/crypto/webcrypto';

import enableTOTPAction from '../../../actions/settings/enableTOTP';
import store, { initialState } from '../../../helpers/store';
import { waitForNewState } from '../../testsHelpers/storeTools';
import { enableTOTP as enableTOTPApi } from 'frontend-commons/src/settings/security';

jest.mock('frontend-commons/src/crypto/webcrypto');
jest.mock('frontend-commons/src/settings/security');

describe('test for enableTOTP action', () => {
    beforeEach(() => {
        store.setState(initialState, true);
    });
    const actions = enableTOTPAction(store);


    describe('createSharedSecret', () => {
        beforeAll(() => {
            webcrypto.getRandomValues.mockImplementation((array) => {
                // this is not secure way of having random codes... but it's a test
                return array.map(() => Math.floor(Math.random() * Math.floor(2 ** 8)));
            });
        });
        afterAll(() => {
            webcrypto.getRandomValues.mockRestore();
        });

        const primaryAddressUserAuth = {
            user: {
                Name: 'test',
                Addresses: [
                    {
                        Keys: {
                            something: 'somethat'
                        },
                        Email: 'test@protonmail.stuff'
                    }
                ]
            }
        };

        test('with empty state', async () => {
            const auth = {
                user: {
                    Name: 'test'
                }
            };

            await actions.createSharedSecret({ ...store.getState(), auth });
            const { request: { qrURI, interval, digits, secret }, status } = store.getState().settings.setupTOTP;
            expect(qrURI).toMatch(`otpauth://totp/${
            auth.user.Name + '@protonmail'
                }?secret=${secret}&issuer=ProtonMail&algorithm=SHA1&digits=${digits}&period=${interval}`);
            expect(status).toMatch('init');
        });

        test('with existing data', async () => {
            const stateBefore = store.getState();
            await actions.createSharedSecret({
                ...store.getState(),
                settings: {
                    setupTOTP: {
                        request: {
                            qrURI: 'someting'
                        }
                    }
                }
            });
            expect(store.getState()).toBe(stateBefore); // the store  reference was not changed
        });

        test('with empty state and primary address set', async () => {
            await actions.createSharedSecret({
                ...store.getState(),
                auth: { ...primaryAddressUserAuth }
            });

            const { request: { qrURI, interval, digits, secret }, status } = store.getState().settings.setupTOTP;
            expect(qrURI).toMatch(`otpauth://totp/${
                primaryAddressUserAuth.user.Addresses[0].Email
                }?secret=${secret}&issuer=ProtonMail&algorithm=SHA1&digits=${digits}&period=${interval}`);
            expect(status).toMatch('init');
        });
    });

    describe('enableTOTP', () => {

        afterAll(() => enableTOTPApi.mockRestore());
        beforeEach(() => enableTOTPApi.mockClear());

        describe('state is not initialized', () => {
            test('no setupTOTP', () => {
                return expect(actions.enableTOTP({
                    settings: {}
                }, '123456')).rejects.toThrow();
            });

            test('no setupTOTP.request', () => {
                return expect(actions.enableTOTP({
                    settings: {
                        setupTOTP: {}
                    }
                }, '123456')).rejects.toThrow();
            });

            test('no setupTOTP.request.secret', () => {
                return expect(actions.enableTOTP({
                    settings: {
                        setupTOTP: {
                            request: {}
                        }
                    }
                }, '123456')).rejects.toThrow();
            });

            test('code incorrect', async () => {
                for (const code of ['', '123', '13246578']) {
                    await actions.enableTOTP({
                        settings: {
                            setupTOTP: {
                                request: {
                                    secret: 's3cr3t'
                                }
                            }
                        }
                    }, code);
                    expect(store.getState().settings.setupTOTP).toMatchObject({
                        status: 'failure',
                        error: 'The code is not valid'
                    });
                }
            });
        });

        const state = {
            ...store.getState(),
            scope: {
                creds: {
                    some: 'creds'
                },
                response: {
                    some: 'response'
                }
            },
            settings: {
                setupTOTP: {
                    request: {
                        secret: '1234567egfzfuizagd'
                    }
                }
            }
        };

        test('code is correct', async (done) => {
            const code = '123456';
            const data = {
                TwoFactorRecoveryCodes: ['12345678', 'ef789456'],
                UserSettings: {
                    something: 'somethat'
                }
            };

            enableTOTPApi.mockImplementation(() => ({
                data
            }));
            waitForNewState(done,
                ({ settings: { setupTOTP } }) => {
                    return expect(setupTOTP.status).toBe('fetching');
                },
                (state) => expect(state).toMatchObject({
                    settings: {
                        reset2FARecoveryCodes: {
                            request: {
                                codes: data.TwoFactorRecoveryCodes
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
                    config: {
                        settings: {
                            user: data.UserSettings
                        }
                    },
                    scope: {
                        used: true
                    }
                })
            );
            await actions.enableTOTP(state, code);
        });

        test('code is rejected', async (done) => {
            const code = '123456';
            const errorMessage = 'Some error message';
            const data = {
                TwoFactorRecoveryCodes: ['12345678', 'ef789456'],
                UserSettings: {
                    something: 'somethat'
                }
            };

            enableTOTPApi.mockImplementation(() => {
                throw new Error(errorMessage);
            });
            waitForNewState(done,
                ({ settings: { setupTOTP } }) => {
                    return expect(setupTOTP.status).toBe('fetching');
                },
                (state) => {
                    expect(state.settings.setupTOTP.status).toBe('failure');
                    expect(state.settings.setupTOTP.error.message).toBe(errorMessage);
                }
            );
            await actions.enableTOTP(state, code);
        });
    });
});
