import { Component } from 'preact';
import { connect } from 'unistore/full/preact';

import settingsActions from '../../../../../actions/settings';
import { Content as ModalContent, Footer as ModalFooter, Wrapper as ModalWrapper } from '../../../../ui/Modal';
import TextButton from '../../../../ui/TextButton';
import { getErrorMessage } from '../../../../../helpers/u2f';

import styles from './index.css';
import image from './sign-u2f.png';


/**
 * Modal Form to register a new U2F Key.
 *
 * Fetches the challenge from the server, forward it to U2F API, and sends back the answer to the API.
 */
export class FormRegisterKey extends Component {

    /**
     * when next button is pressed.
     * @param {Event} e
     */
    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit();
    }

    componentDidMount() {
        this.props.addU2FKeyRegisterAction();
    }

    componentWillReceiveProps(newProps) {
        const {
            settings: { addU2FKey: { status: newStatus } }
        } = newProps;

        const {
            settings: { addU2FKey: { status } }
        } = this.props;

        if (newStatus !== status && newStatus === 'finished') {
            this.props.forbidClosure();
        }
    }

    /**
     * Renders the status field.
     * @return {*}
     */
    renderStatus() {
        const {
            settings: { addU2FKey: { response: { name } = {}, status, request, error } }
        } = this.props;

        if (status !== 'failure') {
            return (<div className={styles.status}>
                <div className={styles.row}>
                    <span className={styles.text}>Activate your key</span>
                    <span className={styles.text}>
                            {status || 'fetching'}...
                        </span>
                </div>

                <div className={styles.row}>
                    <span className={styles.text}>Name</span>
                    <span className={[styles.text, styles.nameLabel].join(' ')}>{name}</span>
                </div>
            </div>);

        }
        const { metaData: { code } = {} } = error;
        if (code) {
            return (<div className={styles.status}>
                <span>{getErrorMessage(code, true)}</span>
                <TextButton onClick={() => this.props.addU2FKeyRegisterAction()}>Retry</TextButton>
            </div>);
        }

        this.props.onReset(error.message);
    }

    render () {
        const {
            settings: { addU2FKey: { status } }
        } = this.props;

        return (
            <ModalWrapper
                onSubmit={(e) => this.onSubmit(e)}
                onReset={(e) => {
                    e.preventDefault();
                    this.props.onCancel();
                }}
            >
                <ModalContent className={styles.container}>
                    <img src={image}/>

                    {this.renderStatus()}
                </ModalContent>
                <ModalFooter>
                    <button type="reset" value="Reset" disabled={(status === 'finished')}>
                        Back
                    </button>
                    <button type="submit" value="Submit" disabled={(status !== 'finished')}>
                        Next
                    </button>
                </ModalFooter>
            </ModalWrapper>
        );
    }
}


export default connect(['scope', 'settings'], settingsActions)(FormRegisterKey);
