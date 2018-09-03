import appDispatcher from 'frontend-commons/src/utils/appDispatcher';

const dispatcher = appDispatcher('notification');

const action = (type) => (message, opt = {}) => dispatcher.input(type, { message, opt });
export const success = action('success');
export const error = (err) => action('error')(err.message, err);
export const info = action('info');

export const onInput = dispatcher.onInput;
