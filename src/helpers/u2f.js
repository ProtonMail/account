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

export async function signU2F(U2FRequest) {
    const u2fConfig = appProvider.getConfig('u2f');
    return await sign(U2FRequest, u2fConfig.appID, u2fConfig.timeout);
}

export function getErrorMessage({ ErrorCode: errorCode }, register = false) {
    switch (errorCode) {
        case ERROR_CODE.SUCCESS:
            throw new Error('This is a success!');
        case ERROR_CODE.OTHER_ERROR:
            return 'An error occurred';
        case ERROR_CODE.BAD_REQUEST:
            return 'An internal error occurred.';
        case ERROR_CODE.CONFIGURATION_UNSUPPORTED:
            return 'This security key is not supported.';
        case ERROR_CODE.DEVICE_INELIGIBLE:
            if (register) {
                return 'This security key is already registered for your account!';
            }
            return 'This security key is not recognized.';
        case ERROR_CODE.TIMEOUT:
            return 'The request timed out. Please try again.';
        default:
            throw new Error(`The error code "${errorCode}" does not exist`);
    }
}
