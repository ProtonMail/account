import { connect } from 'unistore/full/preact';
import settingsActions from '../../../../../actions/settings';

import { Content as ModalContent, Footer as ModalFooter, Wrapper as ModalWrapper } from '../../../../ui/Modal';


import styles from './index.css';

const renderInfo = (result) => {
    switch (result) {
        case true:
            return (<p>✓ Test succeeded</p>);
        case false:
            return (<p>⚠ Please test your recovery code to proceed</p>);
        default: return (<p>Your recovery code will not be erased</p>)
    }
};

/**
 * Modal Form to test that a given code is one of the new recovery code.
 * @param {Object} props
 * @param {Function} props.onSubmit - triggers the next step.
 * @param {Function} props.onCancel - triggers the previous step.
 * @returns {ModalWrapper}
 */
const FormTestCode = ({
    onSubmit,
    onCancel,
    settings: { reset2FARecoveryCodes: { result, response = {} } },
    reset2FARecoveryCodesCheckNewCodeAction,
}) => {
    const model = { code: response.code };

    return (
        <ModalWrapper
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            onReset={(e) => {
                e.preventDefault();
                onCancel();
            }}
        >
            <ModalContent>
                <p style={{ flex: 2 }}>
                    Test your recovery codes by entering one of your codes below. If you did not save your recovery
                    codes, go back and save them.
                </p>
                <div class={styles.inputContainer}>
                    <span>Input your code</span>
                    <div>
                        <input
                            class={styles.codeInput}
                            onInput={({ target: { value: code } }) => {
                                model.code = code;
                                if (code.length === 8) {
                                    reset2FARecoveryCodesCheckNewCodeAction(model.code);
                                }
                            }}
                            required={true}
                            value={model.code}
                            style={{ width: '100%' }}
                            type="code"
                            id="verifyCode"
                            placeholder="Code"
                            disabled={!!result}
                        />
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    {renderInfo(result)}
                </div>
            </ModalContent>
            <ModalFooter>
                <button type="reset" value="Reset">
                    Back
                </button>
                <button type="submit" value="Submit" disabled={!result}>
                    Finish
                </button>
            </ModalFooter>
        </ModalWrapper>
    );
};

export default connect('settings', settingsActions)(FormTestCode);
