import { authInfo } from 'frontend-commons/src/crypto/srp';
import { ERROR_CODE, signU2F } from '../../helpers/u2f';
import store, { initialState } from '../../helpers/store';
import scopeActions from '../../actions/scope';
import { waitForNewState } from '../testsHelpers/storeTools';

jest.mock('frontend-commons/src/crypto/srp');

jest.mock('../../helpers/u2f');

describe('scope unit tests', () => {
    const actions = scopeActions(store);

    beforeEach(() => {
        store.setState(initialState, true);
    });

    afterAll(() => {
        store.setState(initialState, true);
        signU2F.mockRestore();
    });

    describe('test unscopeInit', () => {
        const authResponse = {
            something: 'something'
        };
        authInfo.mockImplementation(() => ({ ...authResponse }));

        beforeEach(() => {
            authInfo.mockClear();
        });

        afterAll(() => {
            authInfo.mockRestore();
        });

        test('initial state', async () => {
            await actions.unscopeInitAction(store.getState());
            expect(authInfo).toHaveBeenCalledTimes(1);
            const { scope: { creds, response } } = store.getState();
            expect(creds).toEqual({});
            expect(response).toEqual(authResponse);
        });

        test('with a response', () => {
            actions.unscopeInitAction({
                ...store.getState(), scope: {
                    response: {
                        something: 'something'
                    }
                }
            });
            expect(authInfo).not.toBeCalled();
        });

        test('with a scope marked as used', async () => {
            await actions.unscopeInitAction({
                ...store.getState(),
                scope: {
                    used: true
                }
            });
            expect(authInfo).not.toBeCalled();
        });
    });

    describe('test unscopePassword', () => {
        test('only password', async () => {
            const password = 'some odd password ßßß';
            await actions.unscopePasswordAction(store.getState(), { password });

            expect(store.getState().scope.creds.password).toEqual(password);
        });
        test('password and code', async () => {
            const creds = {
                password: 'some odd password ßßß',
                twoFactorCode: '132456'
            };
            await actions.unscopePasswordAction(store.getState(), creds);
            expect(store.getState().scope.creds).toEqual(creds);
        });

        describe('with an existing scope', () => {
            const scope = {
                response: {
                    something: 'something'
                },
                creds: {
                    password: 'foobar',
                    twoFactorCode: '999999'
                }
            };

            test('password only', async () => {
                const creds = { password: 'some odd password ßßß' };
                await actions.unscopePasswordAction({ ...store.getState(), scope }, creds);

                expect(store.getState().scope).toEqual({
                    ...scope,
                    creds: {
                        password: creds.password,
                        twoFactorCode: scope.creds.twoFactorCode
                    }
                });
            });

            test('password and code', async () => {
                const creds = { password: 'some odd password ßßß', twoFactorCode: '123456' };
                await actions.unscopePasswordAction({ ...store.getState(), scope }, creds);

                expect(store.getState().scope).toEqual({
                    ...scope,
                    creds
                });
            });
        });
    });

    describe('test unscopeU2F', async () => {
        const scope = {
            response: {
                '2FA': {
                    U2F: {
                        foo: 'bar'
                    }
                }
            }
        };

        afterAll(() => {
            signU2F.mockRestore();
        });

        test('success', async (done) => {
            const U2FResponse = {
                something: 'something'
            };

            signU2F.mockImplementation(() => U2FResponse);
            waitForNewState(done,
                (state) => expect(state.scope).toMatchObject({
                    U2FRequest: { status: 'pending', error: undefined }
                }),
                (state) => expect(state.scope).toEqual({
                    ...scope,
                    creds: {
                        U2F: U2FResponse
                    }
                })
            );
            actions.unscopeU2FAction({
                ...store.getState(), scope
            });
        });

        test('failure with U2F error', async (done) => {
            const error = {
                metaData: {
                    code: ERROR_CODE.CONFIGURATION_UNSUPPORTED
                }
            };
            signU2F.mockImplementation(async () => {
                throw error;
            });
            waitForNewState(done,
                (state) => expect(state.scope.U2FRequest.status).toBe('pending'),
                (state) => expect(state.scope).toEqual({
                    ...scope,
                    U2FRequest: {
                        error,
                        status: 'failure'
                    }
                })
            );
            actions.unscopeU2FAction({ ...store.getState(), scope });
        });

        test('failure with non-U2F error', async () => {
            const errorMessage = 'Some random error';
            signU2F.mockImplementation(async () => {
                throw new Error(errorMessage);
            });
            try {
                await actions.unscopeU2FAction({
                    ...store.getState(), scope
                });
            } catch (e) {
                expect(e.message).toMatch(errorMessage);
            }
        });
    });

    const fullScope = {
        U2FRequest: {
            error: {
                metaData: {
                    code: 3
                }
            },
            status: 'failure'
        },
        response: {
            '2FA': {
                U2F: {
                    foo: 'bar'
                }
            }
        },
        creds: {
            password: 'something',
            twoFactorCode: '1023456',
            U2F: {
                something: 'somethat'
            }
        }
    };

    test('unscopeResetTwoFactor', async () => {
        await actions.unscopeResetTwoFactorAction({
            ...store.getState(),
            scope: fullScope
        });
        const { U2FRequest, response, creds } = store.getState().scope;
        expect(U2FRequest).toEqual({});
        expect(response).toBe(fullScope.response);
        expect(creds).toEqual({
            password: fullScope.creds.password
        });
    });

    test('reset scope', async () => {
        await actions.resetScopeStateAction({
            ...store.getState(), scope: fullScope
        });

        expect(store.getState().scope).toEqual({});
    });
});
