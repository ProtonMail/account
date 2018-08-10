import render from 'preact-render-to-string';
import { deep } from 'preact-render-spy';

import { ConfirmCode } from '../../../../../../components/settings/security/TwoFactor/SetupTOTPModal/confirmCode';

const updateTreeStatus = (props) => {
    const code = 425697;

    const onSubmit = jest.fn();
    const onReset = jest.fn();
    const forbidClosure = jest.fn();
    const enableTOTPAction = jest.fn();
    const event = { preventDefault: () => undefined };

    const tree = deep(<ConfirmCode
        settings={{
            setupTOTP: {
                request: {
                    TOTPCode: code
                },
                status: 'init'
            }
        }}
        onSubmit={onSubmit}
        onReset={onReset}
        forbidClosure={forbidClosure}
        enableTOTPAction={enableTOTPAction}
    />);
    tree.find('form').simulate('submit', event); // using the loading state

    expect(tree).toMatchSnapshot();

    tree.render(<ConfirmCode
        settings={{
            setupTOTP: {
                request: {
                    TOTPCode: code
                },
                ...props
            }
        }}
        onSubmit={onSubmit}
        onReset={onReset}

    />);

    return {
        tree,
        onSubmit,
        onReset
    };
};

describe('SetupTOTPModal confirmCode step', () => {
    test('initial display', () => {
        expect(render(<ConfirmCode settings={{}}/>)).toMatchSnapshot();
    });

    test('change code', () => {
        const tree = deep(<ConfirmCode settings={{}}/>);
        tree.find('input').simulate('input', { target: { value: 424242 } });
        expect(tree).toMatchSnapshot();
    });

    test('submit and cancel', () => {
        const code = 425697;

        const onSubmit = jest.fn();
        const onCancel = jest.fn();
        const forbidClosure = jest.fn();
        const enableTOTPAction = jest.fn();

        const tree = deep(<ConfirmCode
            settings={{
                setupTOTP: {
                    request: {
                        TOTPCode: code
                    }
                }
            }}
            onCancel={onCancel}
            onSubmit={onSubmit}
            forbidClosure={forbidClosure}
            enableTOTPAction={enableTOTPAction}/>);
        const event = { preventDefault: () => undefined };

        tree.find('form').simulate('reset', event);
        expect(onCancel).toBeCalled();
        expect(onSubmit).not.toBeCalled();
        expect(forbidClosure).not.toBeCalled();
        expect(enableTOTPAction).not.toBeCalled();

        tree.find('form').simulate('submit', event);
        expect(onCancel).toHaveBeenCalledTimes(1); // last event
        expect(onSubmit).not.toBeCalled();
        expect(forbidClosure).toBeCalled();
        expect(enableTOTPAction).toBeCalled();
        expect(enableTOTPAction).toHaveBeenCalledWith(code);
    });

    test('receiving status success', () => {
        const {
            tree,
            onSubmit
        } = updateTreeStatus({ status: 'success' });

        expect(tree).toMatchSnapshot();
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // not changing the state
        tree.render(<ConfirmCode
            settings={{
                setupTOTP: {
                    request: {
                        TOTPCode: '132456'
                    },
                    status: 'success'
                }
            }}
            onSubmit={onSubmit}
        />);
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });


    test('receiving status failure and no error', () => {
        const {
            tree,
            onReset
        } = updateTreeStatus({ status: 'failure' });

        expect(tree).toMatchSnapshot();
        expect(onReset).toHaveBeenCalledTimes(1);
        expect(onReset).toHaveBeenCalledWith(undefined);

        // not changing the state
        tree.render(<ConfirmCode
            settings={{
                setupTOTP: {
                    request: {
                        TOTPCode: '132456'
                    },
                    status: 'failure'
                }
            }}
            onReset={onReset}
        />);
        expect(onReset).toHaveBeenCalledTimes(1);
    });
    test('receiving status failure and text error', () => {
        const errorMessage = 'This is the error message';
        const {
            tree,
            onReset
        } = updateTreeStatus({ status: 'failure', error: errorMessage });

        expect(tree).toMatchSnapshot();
        expect(onReset).toHaveBeenCalledTimes(1);
        expect(onReset).toHaveBeenCalledWith(errorMessage);
    });

    test('receiving status failure native error', () => {
        const errorMessage = 'This is the error message';
        const {
            tree,
            onReset
        } = updateTreeStatus({ status: 'failure', error: new Error(errorMessage) });

        expect(tree).toMatchSnapshot();
        expect(onReset).toHaveBeenCalledTimes(1);
        expect(onReset).toHaveBeenCalledWith(errorMessage);
    });


    test('receiving props without status', () => {
        const code = 425697;

        const onSubmit = jest.fn();
        const onReset = jest.fn();
        const forbidClosure = jest.fn();
        const enableTOTPAction = jest.fn();
        const event = { preventDefault: () => undefined };

        const tree = deep(<ConfirmCode
            settings={{
                setupTOTP: {
                    request: {
                        TOTPCode: code
                    },
                    status: 'init'
                }
            }}
            onSubmit={onSubmit}
            onReset={onReset}
            forbidClosure={forbidClosure}
            enableTOTPAction={enableTOTPAction}
        />);
        tree.find('form').simulate('submit', event); // using the loading state

        expect(tree).toMatchSnapshot();

        tree.render(<ConfirmCode
            settings={{}}
            onSubmit={onSubmit}
            onReset={onReset}

        />);

        expect(onReset).not.toBeCalled();
        expect(onSubmit).not.toBeCalled();
    });
});
