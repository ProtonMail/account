import render from 'preact-render-to-string';
import { deep } from 'preact-render-spy';

import { FormName } from '../../../../../../components/settings/security/TwoFactor/AddU2FModal/formName';

describe('AddU2FModal SharedSecret step', () => {
    test('display', () => {
        expect(render(<FormName settings={{ addU2FKey: {} }} />)).toMatchSnapshot();
        expect(
            render(<FormName settings={{ addU2FKey: { response: { label: 'Test for key' } } }} />)
        ).toMatchSnapshot();
    });

    test('input event', () => {
        const context = deep(<FormName settings={{ addU2FKey: {} }} />);
        context.find('input').simulate('input', { target: { value: 'Something' } });
    });

    test('submit and cancel', () => {
        const onSubmit = jest.fn();
        const onCancel = jest.fn();
        const addU2FKeyLabelAction = jest.fn();
        const context = deep(
            <FormName
                settings={{ addU2FKey: { response: { label: 'Test for key' } } }}
                {...{
                    onSubmit,
                    onCancel,
                    addU2FKeyLabelAction
                }}
            />
        );

        const event = { preventDefault: () => undefined };

        context.find('form').simulate('submit', event);
        expect(onSubmit).toHaveBeenCalled();
        expect(addU2FKeyLabelAction).toHaveBeenLastCalledWith('Test for key');
        expect(onCancel).not.toHaveBeenCalled();

        context.find('form').simulate('reset', event);
        expect(onSubmit).toHaveBeenCalledTimes(1); // the submit event
        expect(addU2FKeyLabelAction).toHaveBeenCalledTimes(1);
        expect(onCancel).toHaveBeenCalled(); // only once
    });
});
