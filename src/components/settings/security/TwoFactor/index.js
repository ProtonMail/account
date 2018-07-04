import { h, Component } from 'preact';

import style from './style.css';

import U2FKeyList from './U2FKeyList/U2FKeyList';
import { steps as SaveRecoveryCodesSteps, beforeClose as SaveRecoveryCodesBeforeClose } from './SaveRecoveryCodeModal';
import { steps as AddU2FModalSteps, beforeClose as AddU2FModalBeforeClose } from './AddU2FModal';
import SteppedModal from '../../../ui/SteppedModal';

export default class TwoFactorSettings extends Component {

    /**
     * opens the SaveRecoveryCodes Modal.
     */
    onOpenSaveRecoveryCodesModal () {
        this.setState({ SaveRecoveryCodesModalOpen: true });
    }

    /**
     * closes the SaveRecoveryCodes Modal.
     */
    onCloseSaveRecoveryCodesModal () {
        this.setState({ SaveRecoveryCodesModalOpen: false });
    }

    /**
     * opens the SaveRecoveryCodes Modal.
     */
    onOpenU2FModal () {
        this.setState({ U2FModalOpen: true });
    }

    /**
     * closes the U2F Modal.
     */
    onCloseU2FModal () {
        this.setState({ U2FModalOpen: false });
    }

    /**
     * @constructor
     * @param {Object} props
     * @param {Object} props.user
     * @param {Int} props.user.TwoFactor - whether 2FA is active or not.
     * @param {Int} props.user.TOTP - whether TOTP is active or not.
     * @param {Object[]} props.user.U2FKeys - the list of U2FKeys.
     * @param {Int} props.user.U2FKeys[].Compromised - whether the key is Compromised or not.
     * @param {String} props.user.U2FKeys[].KeyHandle - the KeyHandle of the U2FKey.
     * @param {String} props.user.U2FKeys[].Label - the Label of the Key.
     */
    constructor (props) {
        super(props);
        this.state = {
            SaveRecoveryCodesModalOpen: false,
            U2FModalOpen: false
        };
    }

    render () {
        const { TwoFactor, TOTP, U2FKeys } = this.props;
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
                            beforeClose={SaveRecoveryCodesBeforeClose}
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
                            i
                        </i>
                    </div>
                </div>
                <div id="u2f" class={[style.item, style.u2fItem].join(' ')}>
                    <p style={{ flex: 2 }}>2FA via Security Key</p>
                    <button style={{ flex: 1 }} onClick={() => this.onOpenU2FModal()}>{U2FKeys.length
                        ? 'Disable'
                        : 'Enable'}</button>
                    <SteppedModal
                        isOpen={this.state.U2FModalOpen}
                        handleCloseModal={() => this.onCloseU2FModal()}
                        steps={AddU2FModalSteps}
                        beforeClose={AddU2FModalBeforeClose}
                    />
                </div>
                <U2FKeyList U2FKeys={U2FKeys} openModal={() => this.onOpenU2FModal()}/>
            </div>
        );
    }
}
