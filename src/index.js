import './style';
import App from './components/app';
import { createStore, Provider } from 'unistore/full/preact';
import hookErrorActions from './lib/hookErrorActions';

const store = createStore({
  auth: {
    isLoggedIn: false,
    user: {},
    step: 'login',
      twoFactorResponse: {}
  },
    settings: {
        addU2FKey: {},
        reset2FARecoveryCodes: {}
    }
});

hookErrorActions(store, (e) => {
  console.log('-------- ¯\\_(ツ)_/¯ -------');
  console.error(e);
  console.log('---------------------------');
});


export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
