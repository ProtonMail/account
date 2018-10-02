import { h } from 'preact';
import { connect } from 'unistore/full/preact';

import settingsActions from '../../../../../actions/settings';
import { Content as ModalContent, Footer as ModalFooter, Wrapper as ModalWrapper } from '../../../../ui/Modal';

import styles from './index.css';

const renderInfo = (result) => {
    if (typeof result === 'undefined') {
        // result is undefined until the input is lower than 6 characters.
        return <p>Your recovery code will not be erased</p>;
    }

    return <p>{result ? '✓ Test succeeded' : '⚠ Please test your recovery code to proceed'}</p>;
};

/**
 * Modal Form to test that a given code is one of the new recovery code.
 * @param {Object} props
 * @param {Function} props.onSubmit - triggers the next step.
 * @param {Function} props.onCancel - triggers the previous step.
 * @returns {ModalWrapper}
 */
export const FormTestCode = ({
    onSubmit,
    onCancel,
    settings: {
        reset2FARecoveryCodes: { result, response = {} }
    },
    reset2FARecoveryCodesCheckNewCodeAction
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
                <p className={styles.description}>
                    Test your recovery codes by entering one of your codes below. If you did not save your recovery
                    codes, go back and save them.
                </p>
                <div className="form-row">
                    <label htmlFor="verifyCode">Input your code</label>
                    <div>
                        <input
                            onInput={({ target: { value: code } }) => {
                                model.code = code;
                                if (code.length === 8) {
                                    reset2FARecoveryCodesCheckNewCodeAction(model.code);
                                }
                            }}
                            required
                            value={model.code}
                            type="code"
                            id="verifyCode"
                            placeholder="Code"
                            disabled={!!result}
                            autoFocus
                        />
                    </div>
                </div>
                <div className={styles.result}>{renderInfo(result)}</div>
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

export default connect(
    'settings',
    settingsActions
)(FormTestCode);
