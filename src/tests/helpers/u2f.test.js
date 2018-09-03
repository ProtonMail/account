import appProvider from 'frontend-commons/src/appProvider';
import { sign, register } from 'u2f-api';

import { ERROR_CODE, getErrorMessage, registerU2F, signU2F } from '../../helpers/u2f';

jest.mock('frontend-commons/src/appProvider');
jest.mock('u2f-api');

describe('u2f helper', () => {
    beforeAll(() =>
        appProvider.getConfig.mockImplementation(() => ({
            appId: 'https://example.com',
            timeout: 30
        })));
    afterAll(() => appProvider.getConfig.mockRestore());

    test('getErrorMessage', () => {
        for (const key in ERROR_CODE) {
            const code = ERROR_CODE[key];
            if (code) {
                expect(getErrorMessage(code, true)).toBeDefined();
                expect(getErrorMessage(code, false)).toBeDefined();
            } else {
                expect(() => {
                    getErrorMessage(code);
                }).toThrow();
            }
        }

        expect(() => {
            getErrorMessage('I do not exist');
        }).toThrow();
    });

    test('registerU2F', async () => {
        register.mockImplementation(() => ({}));

        await registerU2F({
            RegisteredKeys: [{ Version: 'U2F', KeyHandle: 'flemme' }],
            Challenge: 'challenge',
            Versions: ['U2F_V2']
        });

        expect(register).toBeCalled();

        register.mockRestore();
    });
    test('signU2F', async () => {
        sign.mockImplementation(() => ({}));

        await signU2F({
            RegisteredKeys: [{ Version: 'U2F', KeyHandle: 'flemme' }],
            Challenge: 'challenge'
        });

        expect(sign).toBeCalled();

        sign.mockRestore();
    });
});
