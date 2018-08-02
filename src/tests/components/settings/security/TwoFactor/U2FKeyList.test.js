import { U2FKeyList } from '../../../../../components/settings/security/TwoFactor/U2FKeyList/U2FKeyList';

import render from 'preact-render-to-string';
import { deep } from 'preact-render-spy';

jest.mock('../../../../../actions/settings');


import { deepProvider, renderProvided, shallowProvider } from '../../../../testsHelpers/storeTools';
import store from '../../../../../helpers/store';

describe('U2FKeyList test', () => {
    test('with no key', () => {
        expect(render(<U2FKeyList U2FKeys={[]}/>)).toMatchSnapshot();
    });

    test('with keys', () => {
        const keys = [
            { KeyHandle: '1', Compromised: false, Label: 'First key' },
            { KeyHandle: '2', Compromised: false, Label: 'Second key' },
            { KeyHandle: '3', Compromised: true, Label: 'Compromised key' },
            { KeyHandle: '4', Compromised: false, Label: 'Last key' }
        ];
        expect(render(<U2FKeyList U2FKeys={keys}/>)).toMatchSnapshot();
    });

    test('opening modal', () => {
        const keys = [
            { KeyHandle: '1', Compromised: false, Label: 'First key' },
            { KeyHandle: '2', Compromised: false, Label: 'Second key' },
            { KeyHandle: '3', Compromised: true, Label: 'Compromised key' },
            { KeyHandle: '4', Compromised: false, Label: 'Last key' }
        ];
        const context = deep(<U2FKeyList U2FKeys={keys}/>);
        expect(context.state('confirmDeleteModal')).toBeFalsy();
        context.find('button').first().simulate('click');
        expect(context).toMatchSnapshot();
        expect(context.state('confirmDeleteModal')).toMatchObject(expect.objectContaining({
            KeyHandle: expect.any(String),
            Label: expect.any(String)
        }));
    });
});
