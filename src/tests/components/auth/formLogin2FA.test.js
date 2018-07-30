import FormLogin2FA from '../../../components/auth/formLogin2FA';

import render from 'preact-render-to-string';
import { renderProvided } from '../../testsHelpers/storeTools';


describe('Testing FromLogin2FA', () => {
    test('without U2F', () => {
        expect(render(<FormLogin2FA twoFactorData={{}}/>)).toMatchSnapshot();
    });


    test('with U2F', () => {
        expect(renderProvided(<FormLogin2FA twoFactorData={{ U2F: { bar: 'barbar' } }}/>)).toMatchSnapshot();
    });
});
