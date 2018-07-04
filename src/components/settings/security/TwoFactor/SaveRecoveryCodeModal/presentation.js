import { Component } from 'preact';
import { connect } from 'unistore/full/preact';
import settingsActions from '../../../../../actions/settings';

import { Content as ModalContent, Footer as ModalFooter, Wrapper as ModalWrapper } from '../../../../ui/Modal';

import styles from './index.css';
import { saveAs } from 'file-saver';

import { CopyToClipboard } from 'react-copy-to-clipboard';


class Presentation extends Component {

    componentDidMount() {
        this.props.reset2FARecoveryCodesInitAction();
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
                <ol className={styles.list}>
                    {codes.map((code) => (
                        <li className={styles.item}>
                            <pre>{code}</pre>
                        </li>
                    ))}
                </ol>,
                < div className={styles.actions}>
                    <a href="#" onClick={() => this.downloadClicked()}>
                        DOWNLOAD CODES
                    </a>
                    <CopyToClipboard text={codes.join('\n')}>
                        <a href={'#'}>COPY CODES </a>
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
