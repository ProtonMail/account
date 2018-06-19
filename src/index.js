import './style';
import App from './components/app';
import { createStore, Provider, connect } from 'unistore/full/preact';

const store = createStore({
  auth: {
    isLoggedIn: false,
    user: {},
    step: 'login'
  }
});

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
