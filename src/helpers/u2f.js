import { sign } from 'u2f';
import appProvider from 'frontend-commons/src/appProvider';


export async function signU2F(U2FRequest) {
    const u2fConfig = appProvider.getConfig('u2f');

    try {
        return await sign(U2FRequest, u2fConfig.appID, u2fConfig.timeout);
    } catch (e) {
        if (!e.ErrorCode) throw e;
        return e;
    }
}
