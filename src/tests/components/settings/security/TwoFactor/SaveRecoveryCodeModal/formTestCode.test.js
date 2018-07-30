import { FormTestCode } from '../../../../../../components/settings/security/TwoFactor/SaveRecoveryCodeModal/formTestCode';
import render from 'preact-render-to-string';

import { deep } from 'preact-render-spy';

const renderFormTestCode = (props = {}, { code = '', result = undefined } = {}) => {
    const response = code ? { code } : undefined;
    return <FormTestCode {...props} settings={{
        reset2FARecoveryCodes: { result, response }
    }}/>;
};

describe('test for SaveRecoveryCodeModal SaveCode step', () => {
    test('initial display', () => {
        expect(render(renderFormTestCode())).toMatchSnapshot();
    });

    test('ongoing display', () => {
        expect(render(renderFormTestCode({}, { code: '945dc' }))).toMatchSnapshot();
    });

    test('success display', () => {
        expect(render(renderFormTestCode({}, { result: true }))).toMatchSnapshot();
    });

    test('failure display', () => {
        expect(render(renderFormTestCode({}, { result: false, code: '945dc945dc' }))).toMatchSnapshot();
    });

    test('on input test', () => {
        const reset2FARecoveryCodesCheckNewCodeAction = jest.fn();
        const context = deep(renderFormTestCode({ reset2FARecoveryCodesCheckNewCodeAction }, {
            result: false,
            code: '945dc'
        }));

        context.find('input').simulate('input', { target: { value: '945dcc' } });
        expect(reset2FARecoveryCodesCheckNewCodeAction).not.toHaveBeenCalled();

        context.find('input').simulate('input', { target: { value: '12345678' } });
        expect(reset2FARecoveryCodesCheckNewCodeAction).toHaveBeenCalledWith('12345678');
    });

    test('submit and cancel', () => {
        const onSubmit = jest.fn();
        const onCancel = jest.fn();
        const context = deep(renderFormTestCode({ onSubmit, onCancel }, {
            result: false,
            code: '945dc'
        }));

        const event = { preventDefault: () => undefined };

        context.find('form').simulate('submit', event);
        expect(onSubmit).toHaveBeenCalled();
        expect(onCancel).not.toHaveBeenCalled();

        context.find('form').simulate('reset', event);
        expect(onSubmit).toHaveBeenCalledTimes(1); // the submit event
        expect(onCancel).toHaveBeenCalled(); // only once
    });
});
