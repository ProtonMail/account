import styles from './index.css';
import { styles as ModalStyles } from '../../../../ui/Modal';
import { saveAs } from 'file-saver';

import { CopyToClipboard } from 'react-copy-to-clipboard';

/**
 * generates a TXT document, and download it from the browser.
 * @param {String[]} codes - the list of codes.
 */
function downloadClicked ( codes ) {
    const blob = new Blob([ codes.join('\r\n') ], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'proton-recovery-codes.txt');
}

/**
 * Display a list of codes.
 * @param {Object} params - the params.
 * @param {String[]} params.codes - the list of codes.
 * @param {Function} onSubmit - triggered when next is pressed.
 * @param {Function} onCancel - triggered when previous is pressed.
 * @return {Component}
 */
export default function Presentation ( { params: { codes }, onSubmit, onCancel } ) {
    if (!codes) {
        codes = [
            'd1e4822e',
            '2d83d85b',
            '717ebed4',
            'a9ffee38',
            'f34ebdf7',
            'd1321481',
            '2572f6cd',
            '39bd63b3',
            'c8016641',
            'a9b4cf9d',
            '8f475f77',
            '123d33b1'
        ];
    }

    return (
        <form
            class={ModalStyles.wrapper}
            onSubmit={( e ) => {
                e.preventDefault();
                onSubmit({ codes });
            }}
            onReset={( e ) => {
                e.preventDefault();
                onCancel({ codes });
            }}
        >
            <div class={ModalStyles.content}>
                <p>
                    Please keep your recovery codes in a safe place. Otherwise, you can permanently lose access to your
                    account if you loose your 2FA device
                </p>
                <p>Each recovery code can only be used once</p>
                <ol class={styles[ 'CodePresentation-List' ]}>
                    {codes.map(( code ) => (
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
            </div>
            <div class={ModalStyles.footer}>
                <button type="reset" disabled={true} value="Reset">
                    Back
                </button>
                <button type="submit" value="Submit">
                    Next
                </button>
            </div>
        </form>
    );
}

Presentation.canBeClosed = 'Hi';
