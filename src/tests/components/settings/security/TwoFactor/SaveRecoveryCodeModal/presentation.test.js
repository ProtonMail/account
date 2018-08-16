import render from 'preact-render-to-string';
import { deep } from 'preact-render-spy';
import { saveAs } from 'file-saver';

import { Presentation } from '../../../../../../components/settings/security/TwoFactor/SaveRecoveryCodeModal/presentation';

jest.mock('file-saver');

const renderPresentation = ({ codes, error } = {}, props = {}) => {
    return <Presentation reset2FARecoveryCodesInitAction={() => null} {...props} settings={{
        reset2FARecoveryCodes: {
            error,
            request: {
                codes: codes || ['5bb72b16',
                    '87739d2c',
                    '6c11bf08',
                    '37b9d9f5',
                    '8561a630',
                    '4684bfc5',
                    '8a7a4335',
                    '5c7235c5',
                    '542a1827',
                    '52d64018',
                    '945dcb5d',
                    '3bfe23c9'
                ]
            }
        }
    }}/>;
};

describe('SaveRecoveryCodeModal presentation', () => {
    test('display', () => {
        expect(render(renderPresentation())).toMatchSnapshot();
    });

    test('loading display', () => {
        expect(render(<Presentation reset2FARecoveryCodesInitAction={() => null} settings={{
            reset2FARecoveryCodes: {}
        }}/>)).toMatchSnapshot();
    });

    test('download button', () => {
        const saveAsAction = jest.fn();
        saveAs.mockImplementation(saveAsAction);

        const context = deep(renderPresentation());
        context.find('a').first().simulate('click');
        expect(saveAsAction).toBeCalled();
    });


    test('submit and cancel', () => {
        const onSubmit = jest.fn();
        const onCancel = jest.fn();
        const context = deep(renderPresentation(undefined, { onSubmit, onCancel }));

        const event = { preventDefault: () => undefined };

        context.find('form').simulate('submit', event);
        expect(onSubmit).toHaveBeenCalled();
        expect(onCancel).not.toHaveBeenCalled();

        context.find('form').simulate('reset', event);
        expect(onSubmit).toHaveBeenCalledTimes(1); // the submit event
        expect(onCancel).toHaveBeenCalled(); // only once
    });

    test('reset when error received', () => {
        const onReset = jest.fn();
        const context = deep(renderPresentation(undefined, { onReset }));
        expect(onReset).toHaveBeenCalledTimes(0);

        let error = new Error('TestError');
        context.render(renderPresentation({ error }, { onReset }));
        expect(onReset).toHaveBeenCalledTimes(1);
        expect(onReset).toHaveBeenLastCalledWith(error.message);

        // calling with same props
        context.render(renderPresentation({ error }, { onReset }));
        expect(onReset).toHaveBeenCalledTimes(1); // not recalled

        error = new Error('It\'s not the intended behavior... ');
        context.render(renderPresentation({ error }, { onReset }));
        expect(onReset).toHaveBeenCalledTimes(2); // recalled
        expect(onReset).toHaveBeenLastCalledWith(error.message);
    });
});
