import render from 'preact-render-to-string';
import { deep } from 'preact-render-spy';

import { FormRegisterKey } from '../../../../../../components/settings/security/TwoFactor/AddU2FModal/formRegisterKey';
import { ERROR_CODE } from '../../../../../../helpers/u2f';

describe('AddU2FModal step FormRegisterKey', () => {
    test('initial display', () => {
        expect(render(<FormRegisterKey settings={{ addU2FKey: {} }} />)).toMatchSnapshot();

        const settings = { addU2FKey: { response: { name: 'Test name' }, status: undefined, error: undefined } };
        expect(render(<FormRegisterKey settings={settings} />)).toMatchSnapshot();
    });

    test('failure display with U2F error', () => {
        const settings = {
            addU2FKey: {
                response: { name: 'Test name' },
                status: 'failure',
                error: { metaData: { code: ERROR_CODE.OTHER_ERROR } }
            }
        };
        expect(render(<FormRegisterKey settings={settings} />)).toMatchSnapshot();
    });

    test('failure display with non-U2F error', () => {
        const onReset = jest.fn();
        const settings = {
            addU2FKey: {
                response: { name: 'Test name' },
                status: 'failure',
                error: new Error('Random error?./')
            }
        };
        render(<FormRegisterKey settings={settings} onReset={onReset} />);
        expect(onReset).toBeCalledWith(settings.addU2FKey.error.message);
    });

    test('addU2FAction is correctly called', () => {
        const addU2FKeyRegisterAction = jest.fn();
        const settings = {
            addU2FKey: {
                response: { name: 'Test name' },
                status: 'failure',
                error: { metaData: { code: ERROR_CODE.OTHER_ERROR } }
            }
        };
        const context = deep(<FormRegisterKey settings={settings} addU2FKeyRegisterAction={addU2FKeyRegisterAction} />);
        expect(addU2FKeyRegisterAction).toHaveBeenCalledTimes(1);

        context
            .find('a')
            .first()
            .simulate('click');
        expect(addU2FKeyRegisterAction).toHaveBeenCalledTimes(2);
    });

    test('submit and cancel', () => {
        const addU2FKeyRegisterAction = jest.fn();

        const onSubmit = jest.fn();
        const onCancel = jest.fn();

        const event = { preventDefault: () => undefined };

        const context = deep(
            <FormRegisterKey
                settings={{ addU2FKey: {} }}
                onSubmit={onSubmit}
                onCancel={onCancel}
                addU2FKeyRegisterAction={addU2FKeyRegisterAction}
            />
        );

        context.find('form').simulate('submit', event);
        expect(onSubmit).toHaveBeenCalled();
        expect(onCancel).not.toHaveBeenCalled();

        context.find('form').simulate('reset', event);
        expect(onSubmit).toHaveBeenCalledTimes(1); // the submit event
        expect(onCancel).toHaveBeenCalled(); // only once

        expect(addU2FKeyRegisterAction).toHaveBeenCalledTimes(1);
    });

    test('updating status', () => {
        const addU2FKeyRegisterAction = jest.fn();
        const forbidClosure = jest.fn();

        const context = deep(
            <FormRegisterKey
                settings={{ addU2FKey: {} }}
                addU2FKeyRegisterAction={addU2FKeyRegisterAction}
                forbidClosure={forbidClosure}
            />
        );

        expect(context).toMatchSnapshot();
        expect(forbidClosure).toHaveBeenCalledTimes(0);

        context.render(
            <FormRegisterKey
                settings={{ addU2FKey: { status: 'pending' } }}
                addU2FKeyRegisterAction={addU2FKeyRegisterAction}
                forbidClosure={forbidClosure}
            />
        );
        expect(context).toMatchSnapshot();
        expect(forbidClosure).toHaveBeenCalledTimes(0);

        context.render(
            <FormRegisterKey
                settings={{ addU2FKey: { status: 'finished' } }}
                addU2FKeyRegisterAction={addU2FKeyRegisterAction}
                forbidClosure={forbidClosure}
            />
        );
        expect(context).toMatchSnapshot();
        expect(forbidClosure).toHaveBeenCalledTimes(1);

        context.render(
            <FormRegisterKey
                settings={{ addU2FKey: { status: 'finished' } }}
                addU2FKeyRegisterAction={addU2FKeyRegisterAction}
                forbidClosure={forbidClosure}
            />
        );
        // second time with the same status, we don't expect forbidClosure is recalled
        expect(forbidClosure).toHaveBeenCalledTimes(1);
    });
});
