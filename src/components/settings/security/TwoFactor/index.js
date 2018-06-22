import { h, Component } from 'preact';
import { connect } from 'unistore/full/preact';

import style from './style.css';

import U2FKeyList from './U2FKeyList/U2FKeyList';
import SaveRecoveryCodesSteps from './SaveRecoveryCodeModal';
import SteppedModal from '../../../ui/SteppedModal';

function mapStateToProps({ auth }) {
    return { user: auth.user };
}

export default connect(mapStateToProps)(
    class extends Component {

        onOpenSaveRecoveryCodesModal() {
            this.setState({ SaveRecoveryCodesModalOpen: true });
        }

        onCloseSaveRecoveryCodesModal() {
            this.setState({ SaveRecoveryCodesModalOpen: false });
        }

        constructor(props) {
            super(props);
            this.state = {
                SaveRecoveryCodesModalOpen: false
            };
        }

        render() {
            if (!Object.keys(this.props.user).length) return null;
            const { TwoFactor, TOTP, U2FKeys } = this.props.user;
            return (
                <div class={style.twoFactor}>
                    <h2>Two-Factor Authentication</h2>
                    <div class="alert alert-info">
                        {' '}
                        Two-factor authentication is currently {TwoFactor ? 'on' : 'off'}.
                    </div>
                    <div id="totp" class={style.item}>
                        <div style={{ flex: 2 }}>2FA via Application</div>
                        <button style={{ flex: 1 }}>{TOTP ? 'Disable' : 'Enable'}</button>
                        <div style={{ flex: 2 }}>
                            <SteppedModal
                                isOpen={this.state.SaveRecoveryCodesModalOpen}
                                handleCloseModal={this.onCloseSaveRecoveryCodesModal.bind(this)}
                                steps={SaveRecoveryCodesSteps}
                            />
                            <a href="#" onClick={this.onOpenSaveRecoveryCodesModal.bind(this)}>
                                Regenerate recovery codes
                            </a>
                            <i
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Regenerate recovery codes will invalidate existing recovery codes"
                            >
                                {' '}
                                i
                            </i>
                        </div>
                    </div>
                    <div id="u2f" class={[style.item, style.u2fItem].join(' ')}>
                        <p style={{ flex: 2 }}>2FA via Security Key</p>
                        <button style={{ flex: 1 }}>{U2FKeys.length ? 'Disable' : 'Enable'}</button>
                    </div>
                    <U2FKeyList U2FKeys={U2FKeys} />
                </div>
            );
        }
    }
);
