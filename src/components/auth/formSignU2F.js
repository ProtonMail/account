import { h, Component } from 'preact';
import authActions from './../../actions/authentication';
import { connect } from 'unistore/full/preact';

class FormSignU2F extends Component {
    sendSignRequest () {
        this.props.loginSignU2FAction();
    }

    componentDidMount () {
        this.sendSignRequest();
    }

    render () {
        const { success, U2FResponse = {} } = this.props.auth.twoFactorResponse;

        if (success && !U2FResponse.ErrorCode) {
            return <div><p>Success</p></div>;
        }

        return (<div id={this.props.id} style={this.props.style} class={this.props.class}>
            <p>Activate your security key</p>
            {!success && !!U2FResponse.ErrorCode && <p>
                <span>Sorry, it did not work. (error code: {U2FResponse.ErrorCode})</span>
                <button onClick={() => this.sendSignRequest()}>Retry</button>
            </p>}
        </div>);
    }
}

export default connect('auth', authActions)(FormSignU2F);
