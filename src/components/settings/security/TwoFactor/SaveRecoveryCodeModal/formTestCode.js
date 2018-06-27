import { connect } from 'unistore/full/preact';
import settingsActions from '../../../../../actions/settings';

import { styles as ModalStyles } from '../../../../ui/Modal';
import styles from './index.css';

const renderInfo = (step) => {
    switch (step) {
        case "success": return(<p>✓ Test succeeded</p>);
        case "failure": return (<p>⚠ Please test your recovery code to proceed</p>)
        default: return (<p>Your recovery code will not be erased</p>)
    }
};

const FormTestCode = ({
    onSubmit,
    onCancel,
    settings: { reset2FARecoveryCodes: { step, response = {} } },
    reset2FARecoveryCodesAction,
    resetStoreAction
}) => {
    const model = { code: response.code };

    if (step === 'init') {
        reset2FARecoveryCodesAction();
    }

    return (
        <form
            class={ModalStyles.wrapper}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
                resetStoreAction([ 'addU2FKey', 'reset2FARecoveryCodes' ]);
            }}
            onReset={(e) => {
                e.preventDefault();
                onCancel();
            }}
        >
            <div class={ModalStyles.content}>
                <p style={{ flex: 2 }}>
                    Test your recovery codes by entering one of your codes below. If you did not save your recovery
                    codes, go back and save them.
                </p>
                <div class={styles[ 'TestCodeForm-InputContainer' ]}>
                    <span>Input your code</span>
                    <div>
                        <input
                            onInput={({ target: { value: code } }) => {
                                model.code = code;
                                if (code.length === 8) {
                                    reset2FARecoveryCodesAction(model);
                                }
                            }}
                            required={true}
                            value={model.code}
                            style={{ width: '100%' }}
                            type="code"
                            id="verifyCode"
                            placeholder="Code"
                            disabled={step === 'success'}
                        />
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    {renderInfo(step)}
                </div>
            </div>
            <div class={ModalStyles.footer}>
                <button type="reset" value="Reset">
                    Back
                </button>
                <button type="submit" value="Submit" disabled={step !== 'success'}>
                    Finish
                </button>
            </div>
        </form>
    );
};

export default connect('settings', settingsActions)(FormTestCode);
