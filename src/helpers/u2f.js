import { sign, register } from 'u2f-api';
import appProvider from 'frontend-commons/src/appProvider';

export const ERROR_CODE = {
    SUCCESS: 0,
    OTHER_ERROR: 1,
    BAD_REQUEST: 2,
    CONFIGURATION_UNSUPPORTED: 3,
    DEVICE_INELIGIBLE: 4,
    TIMEOUT: 5
};

const ERROR_MAP = {
    [ERROR_CODE.SUCCESS]: () => {
        throw new Error('This is a success!');
    },
    [ERROR_CODE.OTHER_ERROR]: () => 'An error occurred',
    [ERROR_CODE.BAD_REQUEST]: () => 'An internal error occurred.',
    [ERROR_CODE.CONFIGURATION_UNSUPPORTED]: () => 'This security key is not supported.',
    [ERROR_CODE.DEVICE_INELIGIBLE]: (register) =>
        register ? 'This security key is already registered for your account!' : 'This security key is not recognized.',
    [ERROR_CODE.TIMEOUT]: () =>
        'Looks like you are taking too long to respond, please try again with a bit of motivation.'
};

/**
 * Sends a SIGN request to the U2F device
 * @param {Object} U2FRequest - the U2FRequest
 * @param {Object[]} U2FRequest.RegisteredKeys - the registered keys
 * @param {String} U2FRequest.Challenge - the challenge
 * @return {Promise<SignResponse>}
 */
export async function signU2F({ RegisteredKeys: registeredKeys, Challenge: challenge }) {
    const { appId, timeout } = appProvider.getConfig('u2f');

    const signRequest = registeredKeys.map(({ Version: version, KeyHandle: keyHandle }) => ({
        version,
        keyHandle,
        appId,
        challenge
    }));

    return await sign(signRequest, timeout);
}

/**
 * Sends a REGISTER request to the U2F device.
 * @param {Object} U2FRequest - the U2FRequest
 * @param {Object[]} U2FRequest.RegisteredKeys - the registered keys
 * @param {String} U2FRequest.Challenge - the challenge
 * @param {String[]} U2FRequest.Versions - the different versions accepted by the server
 * @return {Promise<RegisterResponse>}
 */
export async function registerU2F({ RegisteredKeys: registeredKeys, Challenge: challenge, Versions: versions }) {
    const { appId, timeout } = appProvider.getConfig('u2f');
    const signRequest = registeredKeys.map(({ Version: version, KeyHandle: keyHandle }) => ({
        version,
        keyHandle
    }));

    const registerRequests = versions.map((version) => ({
        version,
        challenge,
        appId
    }));

    return await register(registerRequests, signRequest, timeout);
}

/**
 * Computes an error message from a U2F error code.
 * @param {number} errorCode - an error code.
 * @param register
 * @return {*}
 */
export function getErrorMessage(errorCode, register = false) {
    if (ERROR_MAP[errorCode]) {
        return ERROR_MAP[errorCode](register);
    }
    throw new Error(`The error code "${errorCode}" does not exist`);
}
