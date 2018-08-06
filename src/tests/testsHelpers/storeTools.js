import render from 'preact-render-to-string';
import { deep } from 'preact-render-spy';

import store from '../../helpers/store';
import { Provider } from 'unistore/full/preact';

import defaultStore from '../../helpers/store';

/**
 * Shallow-renders the component, embedded into a depth. Uses `preact-render-spy`.
 * @param {Component} component
 * @param {Object?} store - default to the exported value from the helpers/store
 * @param {int?} depth - the depth, initial value to 2, to bypass the provider
 * @return {RenderContext<any, any>}
 * @function
 */
export const shallowProvider = (component, store = defaultStore, depth = 2) => {
    return deep(<Provider store={store} id="app">{component}</Provider>, { depth });
};

/**
 * Deep-renders of the component, embedded into a depth. Uses `preact-render-spy`
 * @param {Component} component
 * @param {Object?} store - default to the exported value from the helpers/store
 * @param {int?} depth - the depth, initial value to 2, to bypass the provider
 * @return {RenderContext<any, any>}
 * @function
 */
export const deepProvider = (component, store = defaultStore, depth = undefined) => {
    if (depth) {
        return deep(<Provider store={store} id="app">{component}</Provider>, { depth });
    }
    return deep(<Provider store={store} id="app">{component}</Provider>);

};

/**
 * renders the component embedded inside a Provider. Uses `preact-render-to-string`
 * @param {Component} component - the component to render
 * @param {Object?} store - the store, default to the exported value from the helpers/store
 * @return {*}
 * @function
 */
export const renderProvided = (component, store = defaultStore) => {
    return render(<Provider store={store} id="app">{component}</Provider>);
};

/**
 * Waits until the store is updated. The function will attached a listener (taken from the parameters) to each of the next update. Done is called once the last listener was invoked.
 * @param {Function} done - to be called once each listener have been consumed. It accepts one optional argument: the error.
 * @param {Function} action - the listener to be attached to the next update of the state.
 * @param {...Function} nextActions - a listener to be attached to the $n+1$ store update.
 * @function
 */
export const waitForNewState = (done, action, ...nextActions) => {
    const next = nextActions.length
        ? () => waitForNewState(done, ...nextActions)
        : done;

    const subscriber = (state) => {
        try {
            action(state);
            store.unsubscribe(subscriber);
            next();
        } catch (e) {
            done(e);
        }
    };
    store.subscribe(subscriber);
};
