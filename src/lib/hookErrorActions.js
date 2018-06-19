const noop = () => {};

/**
 * Manage errors from actions
 *  -- Mutate the store --
 *  @link {https://github.com/developit/unistore/issues/83#issuecomment-389848046}
 * @param  {Object} store
 * @param  {Function} hook
 * @return {void}
 */
export default function hookErrorActions(store, hook = noop) {
    const action = store.action;
    store.action = function(...args) {
        const fn = action.apply(this, args);
        return function(...args) {
            fn.apply(this, args).catch(hook);
        };
    };
}
