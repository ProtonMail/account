import { h, Component } from 'preact';
import { styles as ModalStyles } from '../../../../ui/Modal';
import styles from './index.css';

/**
 * Asks the user to give on of the recovery codes to be able to continue.
 */
export default class TestCodesModal extends Component {

    /**
     * verifies the code is valid.
     * @param {String} code - the code to be checked.
     * @return {boolean}
     */
    isValid ( code ) {
        return this.props.params.codes.indexOf(code) > -1;
    }

    /**
     * Verfies the code each time it is updated by the user. If the code is not 8 chars, it will not be checked.
     * @param {Event} e - the changed event.
     */
    onCodeChange ( e ) {
        const code = e.target.value;
        let valid = 0;
        if (code.length === 8) {
            valid = 1 + this.isValid(code);
        }
        this.setState({ code: e.target.value, valid });
    }

    /**
     * @constructor
     * @param {Object} props
     * @param {Object} props.params
     * @param {String[]} props.params.codes - the list of recovery codes.
     */
    constructor ( props ) {
        super(props);
        this.state = {
            code: '',
            valid: 0
        };
    }

    /**
     * Render the code section: either an input, if the code was not validated, or a span telling the code is validated.
     * @return {Component}
     */
    renderCode () {
        if (this.state.valid === 2) {
            return <span>v Test succeeded</span>;
        }
        return (
            <input
                onInput={this.onCodeChange.bind(this)}
                value={this.state.code}
                style={{ width: '100%' }}
                type="code"
                id="verifyCode"
                placeholder="Code"
            />
        );
    }

    render () {
        return (
            <form
                class={ModalStyles.wrapper}
                onSubmit={( e ) => {
                    e.preventDefault();
                    this.props.onSubmit({});
                }}
                onReset={( e ) => {
                    e.preventDefault();
                    this.props.onCancel({});
                }}
            >
                <div class={ModalStyles.content}>
                    <p style={{ flex: 2 }}>
                        Test your recovery codes by entering one of your codes below. If you did not save your recovery
                        codes, go back and save them.
                    </p>
                    <div class={styles[ 'TestCodeForm-InputContainer' ]}>
                        <span>Input your code</span>
                        <div>{this.renderCode()}</div>
                    </div>
                    {this.state.valid === 1 && (
                        <div style={{ flex: 1 }}>
                            <p>! Please test one of your recovery code</p>
                        </div>
                    )}
                </div>
                <div class={ModalStyles.footer}>
                    <button type="reset" value="Reset">
                        Back
                    </button>
                    <button type="submit" value="Submit" disabled={this.state.valid !== 2}>
                        Finish
                    </button>
                </div>
            </form>
        );
    }
}
