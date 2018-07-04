import { Component } from 'preact';
import { Content as ModalContent, Footer as ModalFooter, Wrapper as ModalWrapper } from '../../ui/Modal/index';
import { connect } from 'unistore/full/preact';

import scopeActions from '../../../actions/scope';
import TextButton from '../../ui/TextButton';


const style = { display: 'flex', alignSelf: 'wrap', justifyContent: 'space-around', flex: 1 };

/**
 * Modal Form to asks credentials information (password and 2FA).
 */
class ScopeFormModal extends Component {

    componentWillMount() {
        if (this.props.scope.used) {
            this.props.skip();
        }
    }

    componentDidMount() {
        this.props.unscopeInitAction();
        this.setState({ data: { ...this.props.scope.creds } });
    }

    constructor(props) {
        super(props);

        this.state = {
            data: { ...props.scope.creds }
        };
    }

    /**
     * Stores the data is the correct field.
     * @param {Event} e - the event to handle
     * @param {string} e.target.name - the name of the event to handle.
     * @param {string} e.target.value - the value to handle.
     */
    onFieldUpdated({ target: { name, value } }) {
        this.setState({ data: { ...this.state.data, [name]: value } });
    }

    /**
     * Renders the 2FA fields, if needed.
     * @returns {Component}
     */
    renderTwoFactor() {
        const info = this.props.scope.response;
        if (!info) {
            return <div style={style}>Requesting authorization...</div>;
        }
        if (!info.TwoFactor) {
            // returning empty div, to keep the place
            return <div style={style}/>;
        }

        if (this.props.scope.creds.U2F) {
            return <div style={style}>
                <span>Your security key was used. </span> <TextButton
                onClick={this.props.unscopeResetTwoFactorAction}>Undo</TextButton>
            </div>;
        }

        return (<div style={style}>
            <label htmlFor="twoFactorCode">2FA code</label>
            <input
                type="text"
                name="twoFactorCode"
                id="twoFactorCode"
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                minLength="6"
                maxLength="8"
                required
                value={this.state.data.twoFactorCode}
                onInput={this.onFieldUpdated.bind(this)}/>
            {info['2FA'].U2F && (<div style={style}>
                <TextButton onClick={() => this.props.unscopeU2FAction()}>
                    Or use your security key
                </TextButton>
            </div>)}
        </div>);
    }

    render() {
        const scope = this.props.scope;
        return (
            <ModalWrapper
                onSubmit={(e) => {
                    e.preventDefault();
                    this.props.unscopePasswordAction(this.state.data);
                    this.props.onSubmit();
                }}
                onReset={(e) => {
                    e.preventDefault();
                    this.props.onCancel();
                }}
            >
                <ModalContent>
                    <div style={style}>
                        <label htmlFor="password">password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={this.state.data.password}
                            required
                            placeholder="Password"
                            onInput={this.onFieldUpdated.bind(this)}
                        />
                    </div>
                    {this.renderTwoFactor()}
                </ModalContent>
                <ModalFooter>
                    <button type="reset" value="Reset">
                        Back
                    </button>
                    <button type="submit" value="Submit" disabled={!scope.response}>
                        Next
                    </button>
                </ModalFooter>
            </ModalWrapper>
        );
    }
}

export default connect(['scope', 'auth'], scopeActions)(ScopeFormModal);
