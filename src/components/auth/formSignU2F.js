import { h, Component } from 'preact';
import authActions from './../../actions/authentication';
import { connect } from 'unistore/full/preact';
import { ERROR_CODE, getErrorMessage } from '../../helpers/u2f';

/**
 * Form for the login 2FA action.
 */
export class FormSignU2F extends Component {
    sendSignRequest () {
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

    componentDidMount () {
        this.sendSignRequest();
    }

    render () {
        const { success, U2FResponse = {} } = this.props.auth.twoFactorResponse;

        if (success && !U2FResponse.metaData) {
            return <div><p>Success</p></div>;
        }

        const { metaData: { code } = {} } = U2FResponse;

        return (<div id={this.props.id} class={this.props.class}>
            <p>Activate your security key...</p>
            {!success && !!code && <p>
                <span>{getErrorMessage(code)}. </span>
                <button onClick={() => this.sendSignRequest()} type='button'>Retry</button>
            </p>}
        </div>);
    }
}

export default connect('auth', authActions)(FormSignU2F);
