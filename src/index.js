import { h } from 'preact';
import { Provider } from 'unistore/full/preact';

import App from './components/app';
import hookErrorActions from './lib/hookErrorActions';
import store from './helpers/store';

import './style';

hookErrorActions(store, (e) => {
    console.log('-------- ¯\\_(ツ)_/¯ -------');
    console.error(e);
    console.log('---------------------------');
});

const main = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default main;
