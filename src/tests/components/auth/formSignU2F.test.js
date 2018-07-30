import ConnectedFormSignU2F, { FormSignU2F } from '../../../components/auth/formSignU2F';
import { ERROR_CODE } from '../../../helpers/u2f';

import store, { initialState } from '../../../helpers/store';
import toActions from '../../../helpers/toActions';

import { shallow } from 'preact-render-spy';
import { renderProvided, shallowProvider } from '../../testsHelpers/storeTools';

import actions from '../../../actions/authentication';

jest.mock('../../../actions/authentication');


describe('testing FormSignU2F component...', () => {
    afterEach(() => {
        store.setState(initialState, true);
    });

    test('error state', () => {
        const auth = {
            twoFactorResponse: {
                U2FResponse: {
                    metaData: {
                        code: 1
                    }
                }
            }
        };
        store.setState({ auth });
        expect(renderProvided(<ConnectedFormSignU2F/>, store)).toMatchSnapshot();

    });

    test('correct state', () => {
        const auth = {
            twoFactorResponse: {}
        };
        store.setState({ auth });
        expect(renderProvided(<ConnectedFormSignU2F/>, store)).toMatchSnapshot();

    });

    test('success state', () => {
        const auth = {
            twoFactorResponse: { success: true }
        };
        store.setState({ auth });
        expect(renderProvided(<ConnectedFormSignU2F/>, store)).toMatchSnapshot();

    });

    test('retry button', () => {
        const auth = {
            twoFactorResponse: {
                U2FResponse: {
                    metaData: {
                        code: ERROR_CODE.OTHER_ERROR
                    }
                }
            }
        };

        const loginU2FAction = jest.fn();
        const abortLoginAction = jest.fn();

        const component = shallow(<FormSignU2F auth={auth}
                                               loginU2FAction={loginU2FAction}
                                               abortLoginAction={abortLoginAction}/>);

        component.find('[onClick]').simulate('click');
        expect(loginU2FAction).toHaveBeenCalledTimes(2);
        expect(abortLoginAction).toHaveBeenCalledTimes(0);
    });

    test('retry button when timeout', () => {
        const auth = {
            twoFactorResponse: {
                U2FResponse: {
                    metaData: {
                        code: ERROR_CODE.TIMEOUT
                    }
                }
            }
        };

        const loginU2FAction = jest.fn();
        const abortLoginAction = jest.fn();

        const component = shallow(<FormSignU2F auth={auth}
                                               loginU2FAction={loginU2FAction}
                                               abortLoginAction={abortLoginAction}/>);

        component.find('[onClick]').simulate('click');
        expect(loginU2FAction).toHaveBeenCalledTimes(0);
        expect(abortLoginAction).toHaveBeenCalledTimes(2);
    });

    test('mount with empty state', () => {
        const auth = {
            twoFactorResponse: {
                success: false
            }
        };

        const loginU2FAction = jest.fn();
        const abortLoginAction = jest.fn();

        const component = shallow(<FormSignU2F auth={auth}
                                               loginU2FAction={loginU2FAction}
                                               abortLoginAction={abortLoginAction}/>);

        expect(loginU2FAction).toHaveBeenCalledTimes(1);
        expect(abortLoginAction).toHaveBeenCalledTimes(0);

    });

});
