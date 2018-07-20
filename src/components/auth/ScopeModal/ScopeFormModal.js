import { Component } from 'preact';
import { Content as ModalContent, Footer as ModalFooter, Wrapper as ModalWrapper } from '../../ui/Modal/index';
import { connect } from 'unistore/full/preact';

import scopeActions from '../../../actions/scope';
import TextButton from '../../ui/TextButton';

import style from './index.css';
import { getErrorMessage } from '../../../helpers/u2f';

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
            return <div class={style.scopeFormModal}>Requesting authorization...</div>;
        }
        if (!info.TwoFactor) {
            // returning empty div, to keep the place
            return <div class={style.scopeFormModal}/>;
        }

        const {
            creds: { U2F } = {},
            U2FRequest: { status, error } = {}
        } = this.props.scope;

        if (U2F) {
            return (<div class={style.scopeFormModal}>
                <span>Your security key was used. </span>
                <TextButton onClick={this.props.unscopeResetTwoFactorAction}>
                    Undo
                </TextButton>
            </div>);
        }

        if (status === 'pending') {
            return (<div class={style.scopeFormModal}>
                <p>
                    <span>Please activate your security key... </span>
                    <TextButton onClick={this.props.unscopeResetTwoFactorAction}>
                        Cancel
                    </TextButton></p>
            </div>);
        }

        if (status === 'failure') {
            return (<div class={style.scopeFormModal}><p>
                <span>{getErrorMessage(error)} You can </span>
                <TextButton onClick={this.props.unscopeU2FAction}>
                    Try again
                </TextButton>
                <span> or </span>
                <TextButton onClick={this.props.unscopeResetTwoFactorAction}>
                    Use a code
                </TextButton>
                <span>.</span>
            </p>
            </div>);
        }

        const components = [<div class={[style.scopeFormModal, 'form-row'].join(' ')}>
            <label htmlFor="twoFactorCode" class={style.label}>2FA code</label>
            <div>
                <input
                    class={style.input}
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
                    onInput={(e) => this.onFieldUpdated(e)}/>
            </div>
        </div>];
        if (info['2FA'].U2F) {
            components.push((<div class={style.scopeFormModal}>
                <p>
                    <TextButton onClick={() => this.props.unscopeU2FAction()}>
                        Or use your security key
                    </TextButton>
                </p>
            </div>));
        }
        return components;
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
                    {!!this.props.message && (
                        <div>{this.props.message}</div>
                    )}
                    <div class={[style.scopeFormModal, 'form-row'].join(' ')}>
                        <label htmlFor="password" class={style.label}>password</label>
                        <div>
                            <input
                                class={style.input}
                                type="password"
                                name="password"
                                id="password"
                                value={this.state.data.password}
                                required
                                placeholder="Password"
                                onInput={(e) => this.onFieldUpdated(e)}
                                autoFocus={true}
                            />
                        </div>
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
