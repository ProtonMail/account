import { connect } from 'unistore/full/preact';
import settingsActions from '../../../../../actions/settings';

import styles from './index.css';
import { styles as ModalStyles } from '../../../../ui/Modal';
import { saveAs } from 'file-saver';

import { CopyToClipboard } from 'react-copy-to-clipboard';

/**
 * generates a TXT document, and download it from the browser.
 * @param {String[]} codes - the list of codes.
 */
const downloadClicked = (codes) => {
    const blob = new Blob([ codes.join('\r\n') ], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'proton-recovery-codes.txt');
};

const renderContent = (codes) => {
    if (codes) {
        return (<div class={ModalStyles.content}>
            <p>
                Please keep your recovery codes in a safe place. Otherwise, you can permanently lose access to your
                account if you loose your 2FA device
            </p>
            <p>Each recovery code can only be used once</p>
            <ol class={styles[ 'CodePresentation-List' ]}>
                {codes.map((code) => (
                    <li>
                        <pre>{code}</pre>
                    </li>
                ))}
            </ol>
            <div class={styles[ 'CodePresentation-Actions' ]}>
                <a href="#" onClick={() => downloadClicked(codes)}>
                    DOWNLOAD CODES
                </a>
                <CopyToClipboard text={codes.join('\n')}>
                    <a href={'#'}>COPY CODES </a>
                </CopyToClipboard>
            </div>
        </div>);
    }

    return (<div class={ModalStyles.content}>Loading... </div>);
};

/**
 * Display a list of codes.
 * @param {Object} params - the params.
 * @param {String[]} params.codes - the list of codes.
 * @param {Function} onSubmit - triggered when next is pressed.
 * @param {Function} onCancel - triggered when previous is pressed.
 * @return {Component}
 */
const Presentation = ({ settings: { reset2FARecoveryCodes }, onSubmit, onCancel, reset2FARecoveryCodesAction }) => {
    console.debug({ reset2FARecoveryCodes });
    const { request: { codes } = {}, step } = reset2FARecoveryCodes;
    if (!step || step === 'fetching') {
        reset2FARecoveryCodesAction();
    }

    return (<form
        class={ModalStyles.wrapper}
        onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
        }}
        onReset={(e) => {
            e.preventDefault();
            onCancel();
        }}
    >
        {renderContent(codes)}
        <div class={ModalStyles.footer}>
            <button type="reset" disabled={true} value="Reset">
                Back
            </button>
            <button type="submit" value="Submit">
                Next
            </button>
        </div>
    </form>);
};

export default connect('settings', settingsActions)(Presentation);
