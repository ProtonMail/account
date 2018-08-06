import store, { initialState } from '../../helpers/store';
import { ERROR_CODE, signU2F } from '../../helpers/u2f';
import authenticationActions from '../../actions/authentication';

import * as userConnector from 'frontend-commons/src/auth/userConnector';
import { waitForNewState } from '../testsHelpers/storeTools';

jest.mock('../../helpers/u2f');
jest.mock('frontend-commons/src/auth/userConnector');
jest.mock('frontend-commons/src/user/model');
jest.mock('frontend-commons/src/appProvider');


describe('authentication actions test', () => {
    const actions = authenticationActions(store);

    describe('loginU2F action', () => {
        afterAll(() => {
            signU2F.mockRestore();
        });

        beforeEach(() => {
            signU2F.mockClear();
        });

        test('success', async () => {
            const U2FResponse = {
                something: 'something'
            };

            signU2F.mockImplementation(() => U2FResponse);
            userConnector.login2FA.mockImplementation(() => ({
                config: {
                    isUnlockable: true
                },
                user: { halli: 'hallo' }
            }));

            await actions.loginU2FAction({
                ...store.getState(),
                auth: {
                    twoFactorData: {
                        U2F: {
                            something: 'somethat'
                        }
                    }
                }
            });

            expect(signU2F).toBeCalled();
            expect(signU2F).toHaveBeenCalledWith({
                something: 'somethat'
            });

            expect(userConnector.login2FA).toBeCalled();
            expect(userConnector.login2FA).toHaveBeenCalledWith({ U2FResponse });

            userConnector.login2FA.mockRestore();
        });

        test('failure U2F error', async (done) => {
            const error = {
                metaData: {
                    code: ERROR_CODE.CONFIGURATION_UNSUPPORTED
                }
            };
            signU2F.mockImplementation(async () => {
                throw error;
            });
            waitForNewState(done,
                (state) => expect(state.auth.twoFactorResponse.U2FResponse).toEqual({}),
                (state) => expect(state.auth.twoFactorResponse).toEqual({
                    success: false,
                    U2FResponse: error
                })
            );
            await actions.loginU2FAction({
                ...store.getState(),
                auth: {
                    twoFactorData: {
                        U2F: {
                            something: 'somethat'
                        }
                    }
                }
            });
        });
        test('failure non-U2F error', async () => {
            const errorMessage = 'Some random error';
            signU2F.mockImplementation(async () => {
                throw new Error(errorMessage);
            });

            try {
                await actions.loginU2FAction({
                    ...store.getState(),
                    auth: {
                        twoFactorData: {
                            U2F: {
                                something: 'somethat'
                            }
                        }
                    }
                });
            } catch (e) {
                expect(e.message).toMatch(errorMessage);
            }
        });
    });

    test('abortLogin test', async () => {
        await actions.abortLoginAction({
            ...store.getState(),
            auth: {
                twoFactorData: {
                    U2F: {
                        something: 'somethat'
                    }
                }
            }
        });
        expect(store.getState()).toEqual(initialState);
    });
});
