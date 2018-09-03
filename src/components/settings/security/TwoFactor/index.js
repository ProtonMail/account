import { h, Component } from 'preact';
import { connect } from 'unistore/full/preact';
import { isSupported } from 'u2f-api';

import U2FKeyList from './U2FKeyList/U2FKeyList';
import SteppedModal from '../../../ui/SteppedModal';
import ConfirmModal from '../../../ui/ConfirmModal';
import TextButton from '../../../ui/TextButton';
import settingsAction from '../../../../actions/settings';
import {
    steps as SaveRecoveryCodesSteps,
    beforeDismiss as SaveRecoveryCodesBeforeDismiss
} from './SaveRecoveryCodeModal';
import { beforeDismiss as AddU2FModalBeforeDismiss, steps as AddU2FModalSteps } from './AddU2FModal';
import { beforeDismiss as SetupTOTPModalBeforeDismiss, steps as SetupTOTPModalSteps } from './SetupTOTPModal';

import style from './style.css';

/**
 * @param {Object} props
 * @param {Object} props.user
 * @param {Int} props.user.TwoFactor - whether 2FA is active or not.
 * @param {Int} props.user.TOTP - whether TOTP is active or not.
 * @param {Object[]} props.user.U2FKeys - the list of U2FKeys.
 * @param {Int} props.user.U2FKeys[].Compromised - whether the key is Compromised or not.
 * @param {String} props.user.U2FKeys[].KeyHandle - the KeyHandle of the U2FKey.
 * @param {String} props.user.U2FKeys[].Label - the Label of the Key.
 */
class TwoFactorSettings extends Component {
    state = {
        modal: '',
        SaveRecoveryCodesModalOpen: false,
        U2FModalOpen: false,
        DisableU2FModalOpen: false
    };

    openModal(modalName) {
        this.setState({ modal: modalName });
    }

    closeModal() {
        this.setState({ modal: '' });
    }

    renderDisableTwoFactorModal() {
        return (
            <ConfirmModal
                title="Disable 2FA"
                scope="password"
                isOpen={this.state.modal === 'Disable2FA'}
                onAfterClose={() => this.closeModal()}
                onConfirm={() => {
                    this.props.disableTwoFactorAction();
                }}
                onCancel={() => {}}
            >
                <div>Are you sure you want to disable totally Two Factor Authentication?</div>
            </ConfirmModal>
        );
    }

    renderDisableTOTPModal() {
        return (
            <ConfirmModal
                title="Disable TOTP"
                scope="password"
                isOpen={this.state.modal === 'DisableTOTP'}
                onAfterClose={() => this.closeModal()}
                onConfirm={() => {
                    this.props.disableTOTPAction();
                }}
                onCancel={() => {}}
            >
                <div>Are you sure you want to disable 2FA via application?</div>
            </ConfirmModal>
        );
    }

    renderAddU2FModal() {
        return (
            <SteppedModal
                isOpen={this.state.modal === 'AddU2FKey'}
                onRequestClose={() => this.closeModal()}
                steps={AddU2FModalSteps}
                beforeDismiss={AddU2FModalBeforeDismiss}
            />
        );
    }

    renderSetupTOTPModal() {
        return (
            <SteppedModal
                isOpen={this.state.modal === 'SetupTOTP'}
                onRequestClose={() => this.closeModal()}
                steps={SetupTOTPModalSteps}
                beforeDismiss={SetupTOTPModalBeforeDismiss}
            />
        );
    }

    renderSaveRecoveryCodesModal() {
        return (
            <SteppedModal
                isOpen={this.state.modal === 'SaveRecoveryCodes'}
                onRequestClose={() => this.closeModal()}
                beforeDismiss={SaveRecoveryCodesBeforeDismiss}
                steps={SaveRecoveryCodesSteps}
            />
        );
    }

    render() {
        const { TwoFactor, TOTP, U2FKeys = [] } = this.props;

        const u2fClasses = [style.item];
        if (!!TwoFactor) {
            u2fClasses.push(style.lastItem);
        }

        return (
            <div className={style.twoFactor}>
                {this.renderDisableTwoFactorModal()}
                {this.renderSetupTOTPModal()}
                {this.renderDisableTOTPModal()}
                {this.renderAddU2FModal()}
                {this.renderSaveRecoveryCodesModal()}
                <h2>Two-Factor Authentication</h2>
                <div className="alert alert-info">
                    Two-factor authentication is currently {TwoFactor ? 'on' : 'off'}.{' '}
                    {!!TwoFactor && <TextButton onClick={() => this.openModal('Disable2FA')}>Turn off</TextButton>}
                </div>
                <div id="totp" className={style.item}>
                    <div className={style.description}>2FA via Application</div>
                    <button className={style.action} onClick={() => this.openModal(TOTP ? 'DisableTOTP' : 'SetupTOTP')}>
                        {TOTP ? 'Disable' : 'Enable'}
                    </button>
                    {!!TwoFactor && (
                        <div className={style.description}>
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
                        </div>
                    )}
                </div>
                <div className={u2fClasses.join(' ')}>
                    <div className={style.description}>2FA via Security Key</div>
                    <button
                        className={style.action}
                        onClick={() => this.openModal('AddU2FKey')}
                        disabled={!isSupported()}
                    >
                        {U2FKeys.length ? 'Add another key' : 'Enable'}
                    </button>
                </div>
                <U2FKeyList U2FKeys={U2FKeys} />
            </div>
        );
    }
}

export default connect(
    'settings',
    settingsAction
)(TwoFactorSettings);
