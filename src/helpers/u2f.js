import { sign } from 'u2f';
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
        register ? 'This security key is already registered for your account!' : 'This security key is not recognized.'

};

export async function signU2F(U2FRequest) {
    const u2fConfig = appProvider.getConfig('u2f');
    return await sign(U2FRequest, u2fConfig.appID, u2fConfig.timeout);
}

export function getErrorMessage({ ErrorCode: errorCode }, register = false) {
    if (ERROR_MAP[errorCode]) {
        return ERROR_MAP[errorCode](register);
    }
    throw new Error(`The error code "${errorCode}" does not exist`);
}
