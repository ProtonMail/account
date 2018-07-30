import U2FKeyList from '../../../../../components/settings/security/TwoFactor/U2FKeyList/U2FKeyList';

jest.mock('../../../../../actions/settings');


import { deepProvider, renderProvided, shallowProvider } from '../../../../testsHelpers/storeTools';

describe('U2FKeyList test', () => {
    test('with no key', () => {
        expect(renderProvided(<U2FKeyList U2FKeys={[]}/>)).toMatchSnapshot();
    });

    test('with keys', () => {
        const keys = [
            { KeyHandle: '1', Compromised: false, Label: 'First key' },
            { KeyHandle: '2', Compromised: false, Label: 'Second key' },
            { KeyHandle: '3', Compromised: true, Label: 'Compromised key' },
            { KeyHandle: '4', Compromised: false, Label: 'Last key' }
        ];
        expect(renderProvided(<U2FKeyList U2FKeys={keys}/>)).toMatchSnapshot();
    });
});
