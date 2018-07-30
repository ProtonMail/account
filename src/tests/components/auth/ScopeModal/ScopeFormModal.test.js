import render from 'preact-render-to-string';
import { deep } from 'preact-render-spy';
import { ScopeFormModal } from '../../../../components/auth/ScopeModal/ScopeFormModal';
import { ERROR_CODE } from '../../../../helpers/u2f';

describe('ScopeModal step ScopeFormModal', () => {
    describe('initial display', () => {
        test('requesting authorization', () => {
            expect(render(<ScopeFormModal scope={{}}/>)).toMatchSnapshot();
        });

        test('with a message', () => {
            expect(render(<ScopeFormModal message="This is a simple message"
                                          scope={{ response: {} }}/>)).toMatchSnapshot();
        });

        test('without 2FA', () => {
            expect(render(<ScopeFormModal scope={{ response: {} }}/>)).toMatchSnapshot();
        });

        test('with TOTP only', () => {
            const scope = {
                response: {
                    TwoFactor: 1,
                    '2FA': {
                        TOTP: 1,
                        U2F: null
                    }
                }
            };

            expect(render(<ScopeFormModal scope={scope}/>)).toMatchSnapshot();
        });

        test('with U2F only', () => {
            const scope = {
                response: {
                    TwoFactor: 1,
                    '2FA': {
                        U2F: [{ KeyHandle: 'SomeKeyHandle', Label: 'A label' }]
                    }
                }
            };

            expect(render(<ScopeFormModal scope={scope}/>)).toMatchSnapshot();
        });

        test('with U2F and TOTP', () => {
            const scope = {
                response: {
                    TwoFactor: 1,
                    '2FA': {
                        U2F: [{ KeyHandle: 'SomeKeyHandle', Label: 'A label' }],
                        TOTP: 1
                    }
                }
            };

            expect(render(<ScopeFormModal scope={scope}/>)).toMatchSnapshot();
        });

        test('with U2F resolved', () => {
            const scope = {
                response: {
                    TwoFactor: 1,
                    '2FA': {
                        U2F: [{ KeyHandle: 'SomeKeyHandle', Label: 'A label' }],
                        TOTP: 0
                    }
                },
                creds: {
                    U2F: {
                        ClientData: 'the body of U2F is not full but it\'s enough for this test'
                    }
                }
            };

            expect(render(<ScopeFormModal scope={scope}/>)).toMatchSnapshot();
        });

        test('with U2F pending', () => {
            const scope = {
                response: {
                    TwoFactor: 1,
                    '2FA': {
                        U2F: [{ KeyHandle: 'SomeKeyHandle', Label: 'A label' }],
                        TOTP: 0
                    }
                },
                creds: {},
                U2FRequest: {
                    status: 'pending'
                }
            };

            expect(render(<ScopeFormModal scope={scope}/>)).toMatchSnapshot();
        });

        test('with error', () => {
            const scope = {
                response: {
                    TwoFactor: 1,
                    '2FA': {
                        U2F: [{ KeyHandle: 'SomeKeyHandle', Label: 'A label' }],
                        TOTP: 0
                    }
                },
                creds: {},
                U2FRequest: {
                    status: 'failure',
                    error: {
                        metaData: { code: ERROR_CODE.OTHER_ERROR }
                    }
                }
            };

            expect(render(<ScopeFormModal scope={scope}/>)).toMatchSnapshot();

            scope.U2FRequest.error = new Error('Some random error');
            expect(render(<ScopeFormModal scope={scope}/>)).toMatchSnapshot();
        });

    });

    describe('possible actions', () => {
        test('scope already used: ', () => {
            const skip = jest.fn();
            render(<ScopeFormModal scope={{ used: true }} skip={skip}/>);
            expect(skip).toHaveBeenCalledTimes(1);
        });

        test('componentDidMount correctly reset creds', () => {
            const scope = {
                response: {
                    TwoFactor: 1,
                    '2FA': {
                        U2F: [{ KeyHandle: 'SomeKeyHandle', Label: 'A label' }],
                        TOTP: 0
                    }
                },
                creds: {
                    password: 'some password',
                    twoFactorCode: '123456'
                }
            };

            const unscopeInitAction = jest.fn();

            expect(deep(<ScopeFormModal scope={scope} unscopeInitAction={unscopeInitAction}/>)).toMatchSnapshot();
            expect(unscopeInitAction).toHaveBeenCalledTimes(1);
        });

        test('click on use U2F key', () => {
            const scope = {
                response: {
                    TwoFactor: 1,
                    '2FA': {
                        U2F: [{ KeyHandle: 'SomeKeyHandle', Label: 'A label' }]
                    }
                }
            };

            const actions = {
                unscopeInitAction: jest.fn(),
                unscopeU2FAction: jest.fn()
            };

            const tree = deep(<ScopeFormModal scope={scope} {...actions}/>);
            tree.find('button').first().simulate('click');
            expect(actions.unscopeInitAction).toHaveBeenCalledTimes(1);
            expect(actions.unscopeU2FAction).toHaveBeenCalledTimes(1);
        });

        test('input password and code updated', () => {
            const scope = {
                response: {
                    TwoFactor: 1,
                    '2FA': {
                        U2F: [{ KeyHandle: 'SomeKeyHandle', Label: 'A label' }]
                    }
                }
            };

            const actions = {
                unscopeInitAction: jest.fn()
            };

            const tree = deep(<ScopeFormModal scope={scope} {...actions}/>);
            tree.find('input').first().simulate('input', { target: { name: 'password', value: 'example password' } });
            expect(tree).toMatchSnapshot();

            tree.find('input').at(1).simulate('input', { target: { name: 'twoFactorCode', value: '654321' } });
            expect(tree).toMatchSnapshot();

        });

        test('submit and cancel', () => {
            const event = { preventDefault: () => undefined };

            const scope = {
                response: {
                    TwoFactor: 1,
                    '2FA': {
                        U2F: [{ KeyHandle: 'SomeKeyHandle', Label: 'A label' }]
                    }
                },
                creds: {
                    password: 'some password',
                    twoFactorCode: '123456'
                }
            };

            const actions = {
                unscopeInitAction: jest.fn(),
                unscopePasswordAction: jest.fn(),
                onSubmit: jest.fn(),
                onCancel: jest.fn()
            };

            const tree = deep(<ScopeFormModal scope={scope} {...actions}/>);
            tree.find('form').simulate('submit', event);
            expect(actions.onSubmit).toHaveBeenCalled();
            expect(actions.onCancel).not.toHaveBeenCalled();
            expect(actions.unscopePasswordAction).toHaveBeenCalledTimes(1);
            expect(actions.unscopePasswordAction).toHaveBeenCalledWith(scope.creds);

            tree.find('form').simulate('reset', event);
            expect(actions.onCancel).toHaveBeenCalled(); // only once
            expect(actions.onSubmit).toHaveBeenCalledTimes(1); // the submit event from the first call
            expect(actions.unscopePasswordAction).toHaveBeenCalledTimes(1);

        });
    });
});
