import {
    disableTOTP as disableTOTPApi,
    disableTwoFactor as disableTwoFactorApi,
    removeU2FKey,
    resetRecoveryCodes,
} from 'frontend-commons/src/settings/security';
import store, { initialState } from '../../../helpers/store';
import settingsAction from '../../../actions/settings';
import { error, success } from '../../../helpers/notification';

jest.mock('frontend-commons/src/settings/security');
jest.mock('../../../helpers/notification');

const scope = {
    creds: {
        something: 'somethat'
    },
    response: {
        stuff: 'staff'
    }
};


const testSimpleMethodThatUpdateUserSettings = (
    action,
    apiAction, {
        actionParams = [],
        apiActionParams = []
    } = {}
) => {
    afterAll(() => apiAction.mockRestore());
    beforeEach(() => apiAction.mockClear());

    test('success', async () => {
        const userSettings = {
            stuff: 'stuff stuff stuff '
        };
        apiAction.mockImplementation(() => ({
            data: {
                UserSettings: userSettings
            }
        }));

        await action({
            ...store.getState(),
            scope
        }, ...actionParams);

        expect(apiAction).toHaveBeenCalledTimes(1);
        expect(apiAction).toHaveBeenCalledWith(...apiActionParams, scope.creds, scope.response);

        expect(success).toHaveBeenCalledTimes(1);
        expect(error).not.toBeCalled();
        expect(store.getState().config.settings.user).toEqual(userSettings);
        expect(store.getState().config.settings.user).not.toBe(userSettings); // no mutation
    });

    test('error', async () => {
        const errorMessage = 'this is an error message';
        apiAction.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        expect(apiAction);
        await action({
            ...store.getState(),
            scope
        }, ...actionParams);

        expect(apiAction).toHaveBeenCalledTimes(1);
        expect(apiAction).toHaveBeenCalledWith(...apiActionParams, scope.creds, scope.response);

        expect(error).toHaveBeenCalledTimes(1);
        expect(success).not.toBeCalled();
    });
};

describe('settings actions', () => {
    beforeAll(() => {
        success.mockImplementation(() => ({}));
        error.mockImplementation(() => ({}));
    });


    afterAll(() => {
        success.mockRestore();
        error.mockRestore();
    });

    beforeEach(() => {
        success.mockClear();
        error.mockClear();
    });

    afterEach(() => {
        store.setState(initialState, true);
    });

    const actions = settingsAction(store);

    describe('resetStore', () => {
        const settings = {
            a: {
                changed: 'BLABLA'
            },
            b: {
                changed: 'BLABLA'
            },
            c: {
                notChanged: 'BLABLA'
            },
            d: {
                changed: 'BLABLA'
            }
        };
        beforeEach(async () => {
            await store.setState({ settings }, true);
            expect(store.getState().settings).toEqual(settings);
        });

        test('only existing actions', async () => {
            await actions.resetStoreAction(store.getState(), ['a', 'b', 'd']);
            expect(store.getState().settings).toEqual({
                a: {},
                c: settings.c,
                b: {},
                d: {}
            });
        });

        test('not existing action', async () => {
            const stateAtBegin = store.getState();
            await actions.resetStoreAction(store.getState(), ['e', 'f', 'g']);
            expect(store.getState()).toBe(stateAtBegin); // SAME object, setStore should not have been called
        });


        test('mix', async () => {
            await actions.resetStoreAction(store.getState(), ['f', 'a', 'b', 'g', 'd', 'e']);
            expect(store.getState().settings).toEqual({
                a: {},
                b: {},
                c: settings.c,
                d: {}
            });
        });
    });

    describe('test reset 2FA Recovery Codes', () => {
        const codes = [
            '6e99339c', '90818e6c', '1c27d9ae', '01bc0b5f',
            '7bbdc69f', '5f838025', '645bf6fe', '7d8e8b8d',
            '069ff8c7', '08966014', '63d97753', '4945b3ac'
        ];

        describe('reset2FARecoveryCodesInit', () => {

            beforeAll(() => {
                resetRecoveryCodes.mockImplementation(() => ({
                    data: {
                        TwoFactorRecoveryCodes: codes
                    }
                }));
            });
            afterAll(() => {
                resetRecoveryCodes.mockRestore();
            });

            beforeEach(() => resetRecoveryCodes.mockClear());
            test('with new state', async () => {
                await actions.reset2FARecoveryCodesInitAction({
                    ...store.getState(),
                    settings: { reset2FARecoveryCodes: {} }
                });
                expect(store.getState().settings.reset2FARecoveryCodes.request.codes).toEqual(codes);
            });

            test('with existing codes in state', async () => {
                await store.setState({
                    settings: {
                        reset2FARecoveryCodes: {
                            request: {
                                codes
                            }
                        }
                    }
                });
                await actions.reset2FARecoveryCodesInitAction(store.getState());
                expect(store.getState().settings.reset2FARecoveryCodes.request.codes).toEqual(codes);
            });

            test('error while fetching', async () => {
                const errorMessage = 'someError';
                resetRecoveryCodes.mockImplementation(async () => {
                    throw new Error(errorMessage);
                });

                await actions.reset2FARecoveryCodesInitAction({
                    ...store.getState(),
                    settings: { reset2FARecoveryCodes: {} }
                });

                expect(store.getState().settings.reset2FARecoveryCodes.error.message).toEqual(errorMessage);
            });
        });

        describe('reset2FARecoveryCodesCheckNewCode', () => {
            const stateWithCodes = {
                ...store.getState(),
                settings: {
                    reset2FARecoveryCodes: {
                        request: {
                            codes
                        }
                    }
                }
            };

            test('with correct code', async () => {
                await actions.reset2FARecoveryCodesCheckNewCodeAction(stateWithCodes, codes[0]);
                expect(store.getState().settings.reset2FARecoveryCodes).toMatchObject({
                    result: true,
                    response: {
                        code: codes[0]
                    }
                });
            });

            test('with incorrect code', async () => {
                const wrongCode = 'aaaaaa';
                expect(codes).not.toContain(wrongCode); // if the test fails here, `wrongCode` is not wrong (contained in the code array).
                await actions.reset2FARecoveryCodesCheckNewCodeAction(stateWithCodes, wrongCode);
                expect(store.getState().settings.reset2FARecoveryCodes).toMatchObject({
                    result: false,
                    response: {
                        code: wrongCode
                    }
                });
            });

            test('without codes provided', async () => {
                await actions.reset2FARecoveryCodesCheckNewCodeAction({
                    ...store.getState(),
                    settings: { reset2FARecoveryCodes: {} }
                }, codes[0]);
                expect(store.getState().settings.reset2FARecoveryCodes).toMatchObject({
                    result: false,
                    response: {
                        code: codes[0]
                    }
                });
            });
        });

        describe('delete U2F Key', () => {
            const keyHandle = 'Some key handle';
            testSimpleMethodThatUpdateUserSettings(
                actions.deleteU2FKeyAction,
                removeU2FKey,
                {
                    actionParams: [{
                        KeyHandle: keyHandle
                    }],
                    apiActionParams: [keyHandle]
                }
            );
        });

        describe('disable TOTP', () => {
            testSimpleMethodThatUpdateUserSettings(
                actions.disableTOTPAction,
                disableTOTPApi
            );
        });

        describe('disable 2FA', () => {
            testSimpleMethodThatUpdateUserSettings(
                actions.disableTwoFactorAction,
                disableTwoFactorApi
            );
        });
    });
});
