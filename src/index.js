import App from './components/app';
import { Provider } from 'unistore/full/preact';
import hookErrorActions from './lib/hookErrorActions';
import store from './helpers/store';

import './style';

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
