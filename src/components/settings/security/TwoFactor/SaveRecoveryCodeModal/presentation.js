import { Component } from 'preact';
import { connect } from 'unistore/full/preact';
import settingsActions from '../../../../../actions/settings';

import { Content as ModalContent, Footer as ModalFooter, Wrapper as ModalWrapper } from '../../../../ui/Modal';
import TextButton from '../../../../ui/TextButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styles from './index.css';
import { saveAs } from 'file-saver';


export class Presentation extends Component {

    componentDidMount() {
        this.props.reset2FARecoveryCodesInitAction();
    }

    componentWillReceiveProps(newProps) {
        const { settings: { reset2FARecoveryCodes: { error } } } = newProps;

        if (this.props.settings.reset2FARecoveryCodes.error !== error && error) {
            this.props.onReset(error.message);
        }
    }

    /**
     * generates a TXT file, containing the codes, and download it on the browser.
     */
    downloadClicked() {
        const { settings: { reset2FARecoveryCodes: { request: { codes } = {} } } } = this.props;

        const blob = new Blob([codes.join('\r\n')], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'proton-recovery-codes.txt');
    }

    /**
     * renders the content of the modal.
     * @returns {ModalContent}
     */
    renderContent() {
        const { settings: { reset2FARecoveryCodes: { request: { codes } = {} } } } = this.props;

        return (<ModalContent>
            <p>
                Please keep your recovery codes in a safe place. Otherwise, you can permanently lose access to your
                account if you loose your 2FA device
            </p>
            <p>Each recovery code can only be used once</p>
            {codes && codes.length && [
                <ol class={styles.list}>
                    {codes.map((code) => (
                        <li class={styles.item}>
                            <pre class={styles.code}>{code}</pre>
                        </li>
                    ))}
                </ol>,
                <div class={styles.actions}>
                    <TextButton onClick={() => this.downloadClicked()}>
                        DOWNLOAD CODES
                    </TextButton>
                    <CopyToClipboard text={codes.join('\n')}>
                        <TextButton>COPY CODES </TextButton>
                    </CopyToClipboard>
                </div>
            ] || <p>Loading... </p>}

        </ModalContent>);
    };


    render() {
        return (<ModalWrapper
            onSubmit={(e) => {
                e.preventDefault();
                this.props.onSubmit();
            }}
            onReset={(e) => {
                e.preventDefault();
                this.props.onCancel();
            }}
        >
            {this.renderContent()}
            <ModalFooter>
                <button type="reset" value="Reset" disabled>
                    Back
                </button>
                <button type="submit" value="Submit">
                    Next
                </button>
            </ModalFooter>
        </ModalWrapper>);
    }
}


export default connect('settings', settingsActions)(Presentation);
