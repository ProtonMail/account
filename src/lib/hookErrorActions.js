const noop = () => {};

export default function hookErrorActions(store, hook = noop) {
  const action = store.action;
  store.action = function(...args) {
    const fn = action.apply(this, args);
    return function(...args) {
      fn.apply(this, args).catch(hook);
    };
  };
}