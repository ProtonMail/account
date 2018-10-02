import { h, Component } from 'preact';
import { connect } from 'unistore/full/preact';

import settingsActions from '../../../../../actions/settings';
import { Content as ModalContent, Footer as ModalFooter, Wrapper as ModalWrapper } from '../../../../ui/Modal';
import TextButton from '../../../../ui/TextButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { downloadAsFile } from '../../../../../helpers/text';

import styles from './index.css';

export class Presentation extends Component {
    componentDidMount() {
        this.props.reset2FARecoveryCodesInitAction();
    }

    componentWillReceiveProps(newProps) {
        const {
            settings: {
                reset2FARecoveryCodes: { error }
            }
        } = newProps;

        if (this.props.settings.reset2FARecoveryCodes.error !== error && error) {
            this.props.onReset(error.message);
        }
    }

    /**
     * generates a TXT file, containing the codes, and download it on the browser.
     */
    downloadClicked() {
        const {
            settings: {
                reset2FARecoveryCodes: { request: { codes } = {} }
            }
        } = this.props;

        downloadAsFile('proton-recovery-codes.txt', codes);
    }

    renderCodes(codes = []) {
        if (!codes.length) {
            return <p>Loading... </p>;
        }
        return [
            <ol className={styles.list}>
                {codes.map((code) => (
                    <li className={styles.item}>
                        <pre className={styles.code}>{code}</pre>
                    </li>
                ))}
            </ol>,
            <div className={styles.actions}>
                <TextButton onClick={() => this.downloadClicked()}>DOWNLOAD CODES</TextButton>
                <CopyToClipboard text={codes.join('\n')}>
                    <TextButton>COPY CODES </TextButton>
                </CopyToClipboard>
            </div>
        ];
    }

    /**
     * renders the content of the modal.
     * @returns {ModalContent}
     */
    renderContent() {
        const {
            settings: {
                reset2FARecoveryCodes: { request: { codes } = {} }
            }
        } = this.props;

        return (
            <ModalContent>
                <p>
                    Please keep your recovery codes in a safe place. Otherwise, you can permanently lose access to your
                    account if you loose your 2FA device
                </p>
                <p>Each recovery code can only be used once</p>
                {this.renderCodes(codes)}
            </ModalContent>
        );
    }

    render() {
        return (
            <ModalWrapper
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
            </ModalWrapper>
        );
    }
}

export default connect(
    'settings',
    settingsActions
)(Presentation);
