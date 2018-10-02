import { h, Component } from 'preact';
import { connect } from 'unistore/full/preact';
import { isSupported } from 'u2f-api';

import authActions from './../../actions/authentication';
import { ERROR_CODE, getErrorMessage } from '../../helpers/u2f';

/**
 * Form for the login 2FA action.
 */
export class FormSignU2F extends Component {
    sendSignRequest() {
        const { success, U2FResponse: { metaData: { code } = {} } = {} } = this.props.auth.twoFactorResponse;

        if (!success && code) {
            if (code === ERROR_CODE.TIMEOUT) {
                // we need an updated auth/info
                // the timeout is 1 minute on the client side, it's better
                // to redo the whole process because the challenge expire after 2 minutes.
                // funny thing, firefox uses the errorno OTHER_ERROR (1)
                return this.props.abortLoginAction();
            }
        }

        this.props.loginU2FAction();
    }

    componentDidMount() {
        this.sendSignRequest();
    }

    renderCodes(code) {
        if (code) {
            return (
                <p>
                    <span>{getErrorMessage(code)}. </span>
                    <button onClick={() => this.sendSignRequest()} type="button">
                        Retry
                    </button>
                </p>
            );
        }
    }

    render() {
        if (!isSupported()) {
            return (
                <div>
                    <p>Your browser is not supported, please use another 2FA method instead</p>
                </div>
            );
        }

        const { success, U2FResponse = {} } = this.props.auth.twoFactorResponse;

        if (success && !U2FResponse.metaData) {
            return (
                <div>
                    <p>Success</p>
                </div>
            );
        }

        const { metaData: { code } = {} } = U2FResponse;

        return (
            <div id={this.props.id} className={this.props.className}>
                <p>Activate your security key...</p>
                {!success && this.renderCodes(code)}
            </div>
        );
    }
}

export default connect(
    'auth',
    authActions
)(FormSignU2F);
