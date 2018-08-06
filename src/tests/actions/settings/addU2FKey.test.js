import addU2FKeyAction from '../../../actions/settings/addU2FKey';
import store, { initialState } from '../../../helpers/store';
import { waitForNewState } from '../../testsHelpers/storeTools';
import {
    addU2FKey,
    getAddU2FChallenge
} from 'frontend-commons/src/settings/security';
import { ERROR_CODE, registerU2F } from '../../../helpers/u2f';

jest.mock('frontend-commons/src/settings/security');
jest.mock('../../../helpers/u2f');

const begin = new Promise((resolve) => {
    resolve({
        state: {
            response: {
                label: 'name of the new key'
            }
        }, steps: []
    });
});

const end = (store, actions, done) => {
    return ({ state, steps, scope }) => {
        store.setState({
            ...store.getState(),
            settings: {
                addU2FKey: state
            },
            scope
        });
        waitForNewState(done, ...steps);
        return actions.addU2FKeyRegister(store.getState());
    };
};


const normalFetchingPromise = (addU2FKeyState = {}) => ({ state, steps }) => {
    const request = {
        someRequest: 'balabalabal'
    };
    getAddU2FChallenge.mockImplementation(() => request);

    return {
        state: {
            ...state,
            ...addU2FKeyState
        },
        steps: [
            ...steps,
            (state) => {
                expect(getAddU2FChallenge).not.toBeCalled();
                expect(state.settings.addU2FKey.status).toBe('fetching');
            },
            (state) => {
                expect(getAddU2FChallenge).toHaveBeenCalledTimes(1);
                expect(state.settings.addU2FKey).toMatchObject({
                    request,
                    status: 'pending'
                });
            }
        ]
    };
};


const normalCallU2FRegisterAPIPromise = ({ state, steps }) => {
    const U2FResponse = {
        KeyHandle: 'some KeyHandle'

    };
    registerU2F.mockImplementation(() => U2FResponse);
    return {
        state,
        steps: [
            ...steps,
            (state) => {
                expect(registerU2F).toBeCalled();
                expect(registerU2F).toHaveBeenCalledWith(state.settings.addU2FKey.request);
                expect(state.settings.addU2FKey).toMatchObject({
                    u2fResponse: U2FResponse,
                    status: 'success'
                });
            }
        ]
    };
};

const normalPostResponsePromise = ({ state, steps }) => {
    const data = {
        data: {
            TwoFactorRecoveryCodes: ['12345678', '09ABCDEF'],
            UserSettings: {
                something: 'somethat'
            }
        }
    };
    const scope = {
        creds: {
            someCreds: 'that creds'
        },
        response: {
            someResponse: 'that response'
        }
    };

    addU2FKey.mockImplementation(() => data);
    return {
        state,
        scope,
        steps: [
            ...steps,
            (state) => {
                expect(addU2FKey).toHaveBeenCalledTimes(1);
                expect(addU2FKey).toHaveBeenCalledWith(expect.objectContaining(state.settings.addU2FKey.u2fResponse), scope.creds, scope.response);
                expect(state).toMatchObject({
                    settings: {
                        addU2FKey: {
                            status: 'finished'
                        },
                        reset2FARecoveryCodes: {
                            request: {
                                codes: data.data.TwoFactorRecoveryCodes
                            }
                        }
                    },
                    config: {
                        settings: {
                            user: data.data.UserSettings
                        }
                    },
                    scope: {
                        used: true
                    }
                });
            }
        ]
    };
};


describe('test for addU2FKey action', () => {
    beforeEach(() => {
        store.setState(initialState, true);
    });
    const actions = addU2FKeyAction(store);

    describe('set label', () => {
        test('normal behavior', async () => {
            const label = '!Labelo';
            await actions.addU2FKeyLabel(store.getState(), label);
            expect(store.getState().settings.addU2FKey.response).toEqual({ label });
        });
        test('erases the previous state', async () => {
            const label = '!Labello';
            await actions.addU2FKeyLabel({
                ...store.getState(),
                settings: {
                    addU2FKey: {
                        response: {
                            truc: 'mush'
                        }
                    }
                }
            }, label);
            expect(store.getState().settings.addU2FKey.response).toEqual({ label });
        });
    });
    describe('addU2FKeyRegister actions', () => {
        afterAll(() => {
            getAddU2FChallenge.mockRestore();
            addU2FKey.mockRestore();
            registerU2F.mockRestore();
        });
        beforeEach(() => {
            getAddU2FChallenge.mockClear();
            addU2FKey.mockClear();
            registerU2F.mockClear();

        });


        test('full behaviour', async (done) => {
            await begin
                .then(normalFetchingPromise())
                .then(normalCallU2FRegisterAPIPromise)
                .then(normalPostResponsePromise)
                .then(end(store, actions, done));
        });

        describe('different fetching possibilities', () => {
            test('full behaviour after failure and not existing request', async (done) => {
                await begin
                    .then(normalFetchingPromise({
                        errorCode: ERROR_CODE.OTHER_ERROR
                    }))
                    .then(normalCallU2FRegisterAPIPromise)
                    .then(normalPostResponsePromise)
                    .then(end(store, actions, done));
            });

            test('full behaviour after failure and empty request', async (done) => {
                await begin
                    .then(normalFetchingPromise({
                        errorCode: ERROR_CODE.OTHER_ERROR,
                        request: {}
                    }))
                    .then(normalCallU2FRegisterAPIPromise)
                    .then(normalPostResponsePromise)
                    .then(end(store, actions, done));
            });


            test('full behaviour after failure and existing request', async (done) => {
                await begin
                    .then(({ state, steps }) => ({
                        state: {
                            ...state,
                            errorCode: ERROR_CODE.OTHER_ERROR,
                            request: {
                                someRequest: 'some stuff'
                            }
                        },
                        steps: [
                            ...steps,
                            (state) => {
                                expect(getAddU2FChallenge).not.toBeCalled();
                                expect(state.settings.addU2FKey).toMatchObject({
                                    request: state.settings.addU2FKey.request,
                                    status: 'pending'
                                });
                            }
                        ]
                    }))
                    .then(normalCallU2FRegisterAPIPromise)
                    .then(normalPostResponsePromise)
                    .then(end(store, actions, done));
            });

        });

        test('failure of registerU2F', async (done) => {
            await begin
                .then(normalFetchingPromise())
                .then(({ state, steps }) => {
                    const errorMessage = 'some errorMessage';
                    registerU2F.mockImplementation(() => {
                        throw new Error(errorMessage);
                    });
                    return {
                        state,
                        steps: [
                            ...steps,
                            (state) => {
                                expect(registerU2F).toBeCalled();
                                expect(registerU2F).toHaveBeenCalledWith(state.settings.addU2FKey.request);
                                expect(state.settings.addU2FKey).toMatchObject({
                                    status: 'failure'
                                });
                                expect(state.settings.addU2FKey.error.message).toBe(errorMessage);
                                expect(addU2FKey).not.toBeCalled();
                            }
                        ]
                    };
                })
                .then(end(store, actions, done));


            test('failure of post message', async (done) => {
                await begin
                    .then(normalFetchingPromise())
                    .then(normalCallU2FRegisterAPIPromise)
                    .then(({ state, steps }) => {
                        const errorMessage = 'some error while posting message';
                        const scope = {
                            creds: {
                                someCreds: 'that creds'
                            },
                            response: {
                                someResponse: 'that response'
                            }
                        };

                        addU2FKey.mockImplementation(() => {
                            throw new Error(errorMessage);
                        });
                        return {
                            state,
                            scope,
                            steps: [
                                ...steps,
                                (state) => {
                                    expect(addU2FKey).toHaveBeenCalledTimes(1);
                                    expect(addU2FKey).toHaveBeenCalledWith(expect.objectContaining(state.settings.addU2FKey.u2fResponse), scope.creds, scope.response);
                                    expect(state.settings.addU2FKey.error.message).toBe(errorMessage);
                                    expect(state.settings.addU2FKey.status).toBe('failure');
                                    expect(state.scope).not.toMatchObject({ used: true });
                                }
                            ]
                        };

                    })
                    .then(end(store, actions, done));
            });
        });
    });
});
