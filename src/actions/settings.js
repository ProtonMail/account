import { verify } from 'frontend-commons/src/api/paymentsApi';
import { loadExtendedConfig } from 'frontend-commons/src/user/model';
import { isVPN } from 'frontend-commons/src/utils/appType';
import appProvider from 'frontend-commons/src/appProvider';

import toActions from '../lib/toActions';
import { register } from 'u2f';

/**
 * @link { https://github.com/developit/unistore#usage }
 */
const actions = (store) => {
    /**
     * Format the state and extend it as it's not recursive with unistore
     * @param  {Object} state
     * @param  {String} key
     * @param  {Object} value
     * @return {Object}       new state
     */
    const toState = (state, key, value) => ({ [ key ]: { ...state[ key ], ...value } });

    async function resetStore (state, actions) {
        let newState = state;
        for (const action of actions) {
            console.debug({ action });
            if (newState.settings[ action ]) {
                newState = { settings: { ...newState.settings, [ action ]: {} } };
            }
        }
        if (newState !== state) {
            return store.setState(newState);
        }
    }

    async function addU2FKeyName (state, { name }) {
        return store.setState(
            toState(state, 'settings', toState(state.settings, 'addU2FKey', {
                    response: {
                        name
                    }
                })
            )
        );
    }

    async function addU2FKeyRegister (state) {
        const u2fConfig = appProvider.getConfig('u2f');
        const { settings: { addU2FKey: { status = 'initialization', request: storedRequest, response: storedResponse } } } = state;

        console.debug('fetching');
        store.setState(
            toState(state, 'settings', toState(state.settings, 'addU2FKey', { status: 'fetching' }))
        );
        // todo add call in frontend commons
        const request = { // todo move that in frontend commons
            Challenge: 'KGOcAJhmPwMKZ4r8vFb2vZZktLh9wZCmLKHxQQH1bxY',
            Versions: [ 'U2F_V2' ],
            RegisteredKeys: []
        };

        store.setState(
            toState(state, 'settings', toState(state.settings, 'addU2FKey', { status: 'pending' }))
        );
        console.debug('pending');

        // then call U2F api
        const response = await register(request, u2fConfig.appID, u2fConfig.timeout);
        store.setState(
            toState(state, 'settings',
                toState(state.settings, 'addU2FKey', { status: !!response ? 'success' : 'failure' })
            )
        );
        console.debug('finish');

        // then send response...
        // todo send response ;)
        const codes = [
            'aefd34ba',
            '2d83d85b',
            '717ebed4',
            'a9ffee38',
            'f34ebdf7',
            'd1321481',
            '2572f6cd',
            '39bd63b3',
            'c8016641',
            'a9b4cf9d',
            '8f475f77',
            '123d33b1'
        ];
        return store.setState(
            toState(state, 'settings',
                {
                    addU2FKey: toState(state.settings, 'addU2FKey', { status: 'finished' }).addU2FKey,
                    reset2FARecoveryCodes: toState(state.settings, 'reset2FARecoveryCodes', {
                        request: { codes },
                        step: 'init'
                    }).reset2FARecoveryCodes
                }
            )
        );
    }

    async function reset2FARecoveryCodes (state, opt) {
        const {
            settings: {
                reset2FARecoveryCodes: {
                    step = 'init',
                    request: {
                        codes
                    } = {}
                }
            }
        } = state;

        switch (step) {
            case 'init':
                return store.setState(toState(state, 'settings', toState(state.settings, 'reset2FARecoveryCodes', {
                    step: (codes && codes.length) ? 'checking' : 'fetching'
                })));
            case 'fetching':
                return store.setState(toState(state, 'settings', toState(state.settings, 'reset2FARecoveryCodes', {
                    request: {
                        codes: [
                            'd1e4822e',
                            '2d83d85b',
                            '717ebed4',
                            'a9ffee38',
                            'f34ebdf7',
                            'd1321481',
                            '2572f6cd',
                            '39bd63b3',
                            'c8016641',
                            'a9b4cf9d',
                            '8f475f77',
                            '123d33b1'
                        ]
                    },
                    step: 'checking',
                    response: { code: '' }
                })));
            case 'checking':
            case 'failure':
                console.debug({ codes, code: opt.code, index: codes.indexOf(opt.code) });
                return store.setState(toState(state, 'settings', toState(state.settings, 'reset2FARecoveryCodes', {
                    step: (codes.indexOf(opt.code) < 0) ? 'failure' : 'success',
                    response: { ...opt }
                })));
        }
    }

    return toActions({
        addU2FKeyName,
        addU2FKeyRegister,
        reset2FARecoveryCodes,
        resetStore
    });
};

export default actions;
