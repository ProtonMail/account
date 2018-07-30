import render from 'preact-render-to-string';
import { deep } from 'preact-render-spy';
import Presentation from '../../../../../../components/settings/security/TwoFactor/AddU2FModal/presentation';

describe('AddU2FModal Presentation step', () => {
    test('regular display', () => {
        expect(render(<Presentation/>)).toMatchSnapshot();
    });
    test('display with message', () => {
        expect(render(<Presentation message='This is a message'/>)).toMatchSnapshot();
    });

    test('submit and cancel', () => {
        const onSubmit = jest.fn();
        const onCancel = jest.fn();
        const context = deep(<Presentation onSubmit={onSubmit} onCancel={onCancel}/>);

        const event = { preventDefault: () => undefined };

        context.find('form').simulate('submit', event);
        expect(onSubmit).toHaveBeenCalled();
        expect(onCancel).not.toHaveBeenCalled();

        context.find('form').simulate('reset', event);
        expect(onSubmit).toHaveBeenCalledTimes(1); // the submit event
        expect(onCancel).toHaveBeenCalled(); // only once
    });
});
