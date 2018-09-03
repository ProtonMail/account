import render from 'preact-render-to-string';
import { deep } from 'preact-render-spy';

import { SharedSecret } from '../../../../../../components/settings/security/TwoFactor/SetupTOTPModal/sharedSecret';

describe('SetupTOTP SharedSecret step', () => {
    test('regular display', () => {
        expect(
            render(
                <SharedSecret
                    settings={{
                        setupTOTP: {
                            request: {
                                qrURI: 'otp://it does not really care'
                            }
                        }
                    }}
                />
            )
        ).toMatchSnapshot();

        expect(render(<SharedSecret settings={{}} />)).toMatchSnapshot();
    });

    test('raw display', () => {
        const createSharedSecretAction = jest.fn();

        const tree = deep(
            <SharedSecret
                settings={{
                    setupTOTP: {
                        request: {
                            interval: 60,
                            digits: 25.3,
                            secret: 'THIS_IS_SECRET',
                            qrURI: 'otp://it does not really care'
                        }
                    }
                }}
                createSharedSecretAction={createSharedSecretAction}
            />
        );
        tree.find('a')
            .first()
            .simulate('click');
        expect(tree).toMatchSnapshot();
        expect(createSharedSecretAction).toHaveBeenCalledTimes(1);

        const groot = deep(<SharedSecret settings={{}} createSharedSecretAction={createSharedSecretAction} />);
        groot
            .find('a')
            .first()
            .simulate('click');
        expect(groot).toMatchSnapshot();
        expect(createSharedSecretAction).toHaveBeenCalledTimes(2);
    });

    test('submit and cancel', () => {
        const createSharedSecretAction = jest.fn();

        const onSubmit = jest.fn();
        const onCancel = jest.fn();
        const context = deep(
            <SharedSecret
                settings={{}}
                onSubmit={onSubmit}
                onCancel={onCancel}
                createSharedSecretAction={createSharedSecretAction}
            />
        );

        const event = { preventDefault: () => undefined };

        context.find('form').simulate('submit', event);
        expect(onSubmit).toHaveBeenCalled();
        expect(onCancel).not.toHaveBeenCalled();

        context.find('form').simulate('reset', event);
        expect(onSubmit).toHaveBeenCalledTimes(1); // the submit event
        expect(onCancel).toHaveBeenCalled(); // only once

        expect(createSharedSecretAction).toHaveBeenCalledTimes(1);
    });
});
