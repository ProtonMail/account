import render from 'preact-render-to-string';
import { deep } from 'preact-render-spy';
import { Provider } from 'unistore/full/preact';

import defaultStore from '../../helpers/store';

export const shallowProvider = (component, store = defaultStore, depth = 2) => {
    return deep(<Provider store={store} id="app">{component}</Provider>, { depth });
};

export const deepProvider = (component, store = defaultStore, depth = undefined) => {
    if (depth) {
        return deep(<Provider store={store} id="app">{component}</Provider>, { depth });
    }
    return deep(<Provider store={store} id="app">{component}</Provider>);

};

export const renderProvided = (component, store = defaultStore) => {
    return render(<Provider store={store} id="app">{component}</Provider>);
};
