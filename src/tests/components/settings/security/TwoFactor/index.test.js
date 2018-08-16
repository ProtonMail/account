import { isSupported } from 'u2f-api';

import TwoFactorSettings from '../../../../../components/settings/security/TwoFactor';
import { renderProvided } from '../../../../testsHelpers/storeTools';

describe('TwoFactorSettings', () => {
    test('2FA disabled', () => {
        expect(renderProvided(<TwoFactorSettings TwoFactor={0} TOTP={0}/>)).toMatchSnapshot();
    });

    test('TOTP only enable', () => {
        expect(renderProvided(<TwoFactorSettings TwoFactor={1} TOTP={1} U2FKeys={[]}/>)).toMatchSnapshot();
    });

    test('U2F only enable', () => {
        const keys = [
            { KeyHandle: '1', Compromised: false, Label: 'First key' },
            { KeyHandle: '2', Compromised: false, Label: 'Second key' },
            { KeyHandle: '3', Compromised: true, Label: 'Compromised key' },
            { KeyHandle: '4', Compromised: false, Label: 'Last key' }
        ];

        expect(renderProvided(<TwoFactorSettings TwoFactor={1} TOTP={0} U2FKeys={keys}/>)).toMatchSnapshot();
    });

    test('Everything enable', () => {
        const keys = [
            { KeyHandle: '1', Compromised: false, Label: 'First key' },
            { KeyHandle: '2', Compromised: false, Label: 'Second key' },
            { KeyHandle: '3', Compromised: true, Label: 'Compromised key' },
            { KeyHandle: '4', Compromised: false, Label: 'Last key' }
        ];

        expect(renderProvided(<TwoFactorSettings TwoFactor={1} TOTP={1} U2FKeys={keys}/>)).toMatchSnapshot();
    });

    test('U2F not supported', () => {
        const keys = [
            { KeyHandle: '1', Compromised: false, Label: 'First key' },
            { KeyHandle: '2', Compromised: false, Label: 'Second key' }
        ];

        isSupported.mockReturnValueOnce(false);

        expect(renderProvided(<TwoFactorSettings TwoFactor={1} TOTP={1} U2FKeys={keys}/>)).toMatchSnapshot();
    });
});
