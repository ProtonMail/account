import { Component } from 'preact';
import { Content as ModalContent, Footer as ModalFooter, Wrapper as ModalWrapper } from '../../../../ui/Modal';
import TextButton from '../../../../ui/TextButton';
import QRCode from 'qrcode.react';

import { connect } from 'unistore/full/preact';
import settingsActions from '../../../../../actions/settings';

import styles from './index.css';

export class SharedSecret extends Component {

    componentDidMount() {
        this.props.createSharedSecretAction();
    }

    constructor(props) {
        super(props);
        this.state = {
            showingQRCode: true
        };
    }

    renderSwitchModeButton() {
        return (<p>
            <TextButton
                onClick={() => this.setState({ showingQRCode: !this.state.showingQRCode })}>
                {this.state.showingQRCode ? 'Enter key manually instead' : 'Scan QR code'}
            </TextButton>
        </p>);
    }

    renderQRCode() {
        const { setupTOTP: { request: { qrURI } = {} } = {} } = this.props.settings;

        return (<ModalContent>
            <p>{this.props.message || 'Scan this QR code with your two factor authentication device to set up your account. '}</p>
            {this.renderSwitchModeButton()}
            {qrURI
                ? <QRCode value={qrURI} renderAs={'svg'} fgColor={'#505061'} size={256}/>
                : <p>Loading...</p>
            }
        </ModalContent>);

    }

    renderRawInformation() {
        const { setupTOTP: { request: { interval, digits, secret } = {} } = {} } = this.props.settings;

        return <ModalContent>
            <p>{this.props.message || 'Manually enter this information into your two factor authentication device to set up your account. '}</p>
            {this.renderSwitchModeButton()}

            {secret ?
                (<div class={styles.grid}>
                    <div class={styles.row}>
                        <label class={styles.label}>KEY</label>
                        <span class={styles.value}><pre>{secret}</pre></span>
                    </div>
                    <div class={styles.row}>
                        <label class={styles.label}>INTERVAL</label>
                        <span class={styles.value}><pre>{interval} seconds</pre></span>
                    </div>
                    <div class={styles.row}>
                        <label class={styles.label}>LENGTH</label>
                        <span class={styles.value}><pre>{digits} digits</pre></span>
                    </div>
                </div>)
                : <p>Loading...</p>
            }
        </ModalContent>;
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
                {this.state.showingQRCode ? this.renderQRCode() : this.renderRawInformation()}
                <ModalFooter>
                    <button type="reset" value="Reset">
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

export default connect('settings', settingsActions)(SharedSecret);
