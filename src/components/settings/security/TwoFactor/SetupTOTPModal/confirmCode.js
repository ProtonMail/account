import { h, Component } from 'preact';
import { connect } from 'unistore/full/preact';

import settingsActions from '../../../../../actions/settings';
import { Content as ModalContent, Footer as ModalFooter, Wrapper as ModalWrapper } from '../../../../ui/Modal';

import styles from './index.css';

export class ConfirmCode extends Component {
    constructor(props) {
        super(props);
        const {
            settings: { setupTOTP: { request: { TOTPCode } = {} } = {} }
        } = props;
        this.state = {
            code: TOTPCode
        };
    }

    componentWillReceiveProps(newProps) {
        const {
            settings: { setupTOTP: { status, error } = {} }
        } = newProps;

        if (status && status !== this.props.settings.setupTOTP.status) {
            if (status === 'success') {
                this.props.onSubmit();
            }
            if (status === 'failure') {
                this.props.onReset(error ? error.message || error : undefined);
            }
            this.setState({ loading: false });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        this.props.forbidClosure();
        this.props.enableTOTPAction(this.state.code);
    }

    render() {
        return (
            <ModalWrapper
                onSubmit={(e) => {
                    this.onSubmit(e);
                }}
                onReset={(e) => {
                    e.preventDefault();
                    this.props.onCancel();
                }}
            >
                <ModalContent>
                    <p className={styles.description}>Test your new 2FA method:</p>
                    <div className="form-row">
                        <label htmlFor="verifyCode">Input your code</label>
                        <div>
                            <input
                                onInput={({ target: { value: code } }) => {
                                    this.setState({ code });
                                }}
                                required
                                value={this.state.code}
                                disabled={this.state.loading}
                                type="code"
                                id="verifyCode"
                                placeholder="Code"
                                minLength="6"
                                maxLength="6"
                                autoFocus
                            />
                        </div>
                    </div>
                </ModalContent>
                <ModalFooter>
                    <button type="reset" value="Reset" disabled={this.state.loading}>
                        Back
                    </button>
                    <button type="submit" value="Submit" disabled={this.state.loading}>
                        Finish
                    </button>
                </ModalFooter>
            </ModalWrapper>
        );
    }
}

export default connect(
    'settings',
    settingsActions
)(ConfirmCode);
