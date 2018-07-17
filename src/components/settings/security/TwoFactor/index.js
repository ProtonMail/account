import { h, Component } from 'preact';
import { connect } from 'unistore/full/preact';

import style from './style.css';

import U2FKeyList from './U2FKeyList/U2FKeyList';
import { steps as SaveRecoveryCodesSteps, beforeClose as SaveRecoveryCodesBeforeClose } from './SaveRecoveryCodeModal';
import SteppedModal from '../../../ui/SteppedModal';
import ConfirmModal from '../../../ui/ConfirmModal';
import TextButton from '../../../ui/TextButton';

import settingsAction from '../../../../actions/settings';
import { beforeClose as AddU2FModalBeforeClose, steps as AddU2FModalSteps } from './AddU2FModal';

class TwoFactorSettings extends Component {

    openModal(modalName) {
        this.setState({ modal: modalName });
    }

    closeModal() {
        this.setState({ modal: '' });
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
            modal: '',
            SaveRecoveryCodesModalOpen: false,
            U2FModalOpen: false,
            DisableU2FModalOpen: false
        };
    }

    renderDisableTwoFactorModal() {
        return (<ConfirmModal
            title="Disable 2FA"
            scope="password"
            isOpen={this.state.modal === 'Disable2FA'}
            onAfterClose={() => this.closeModal()}
            onConfirm={() => {
                this.props.disableTwoFactorAction();
            }}
            onCancel={() => {
            }}
        >
            <div>
                Are you sure you want to disable totally Two Factor Authentication?
            </div>
        </ConfirmModal>);
    }

    renderDisableTOTPModal() {
        return (<ConfirmModal
            title="Disable TOTP"
            scope="password"
            isOpen={this.state.modal === 'DisableTOTP'}
            onAfterClose={() => this.closeModal()}
            onConfirm={() => {
                this.props.disableTOTPAction();
            }}
            onCancel={() => {
            }}
        >
            <div>
                Are you sure you want to disable 2FA via application?
            </div>
        </ConfirmModal>);
    }

    renderAddU2FModal() {
        return (<SteppedModal
            isOpen={this.state.modal === 'AddU2FKey'}
            handleCloseModal={() => this.closeModal()}
            steps={AddU2FModalSteps}
            beforeClose={AddU2FModalBeforeClose}
        />);
    }

    renderSaveRecoveryCodesModal() {
        return (<SteppedModal
            isOpen={this.state.modal === 'SaveRecoveryCodes'}
            handleCloseModal={() => this.closeModal()}
            beforeClose={SaveRecoveryCodesBeforeClose}
            steps={SaveRecoveryCodesSteps}
        />);
    }

    render () {
        const { TwoFactor, TOTP, U2FKeys = []} = this.props;

        const totpClass = [style.item];
        if (!TwoFactor) totpClass.push(style.lastItem);

        return (
            <div class={style.twoFactor}>
                {this.renderDisableTOTPModal()}
                {this.renderDisableTwoFactorModal()}
                {this.renderAddU2FModal()}
                {this.renderSaveRecoveryCodesModal()}
                <h2>Two-Factor Authentication</h2>
                <div class="alert alert-info" style={{ flexDirection: 'row' }}>
                    Two-factor authentication is currently {TwoFactor ? 'on' : 'off'}.{' '}
                    {!!TwoFactor && <TextButton onClick={() => this.openModal('Disable2FA')}>Turn off</TextButton>}
                </div>
                <div id="totp" class={totpClass.join(' ')}>
                    <div style={{ flex: 2 }}>2FA via Application</div>
                    <button style={{ flex: 1 }} onClick={() => TOTP && this.openModal('DisableTOTP')}>
                        {TOTP ? 'Disable' : 'Enable'}
                    </button>
                    {!!TwoFactor && (<div style={{ flex: 2 }}>
                        <TextButton onClick={() => this.openModal('SaveRecoveryCodes')}>
                            Regenerate recovery codes
                        </TextButton>
                        <i
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Regenerate recovery codes will invalidate existing recovery codes"
                        >
                            i
                        </i>
                    </div>)}
                </div>
                <div id="u2f" class={[style.item, style.lastItem].join(' ')}>
                    <div style={{ flex: 2 }}>2FA via Security Key</div>
                    <button style={{ flex: 1 }} onClick={() => this.openModal('AddU2FKey')}>
                        {U2FKeys.length ? 'Add another key' : 'Enable'}
                    </button>
                </div>
                <U2FKeyList U2FKeys={U2FKeys}/>
            </div>
        );
    }
}

export default connect('settings', settingsAction)(TwoFactorSettings);
