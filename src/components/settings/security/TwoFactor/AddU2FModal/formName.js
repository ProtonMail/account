import { styles as ModalStyles } from '../../../../ui/Modal';
import styles from './index.css';
import settingsActions from '../../../../../actions/settings';
import { connect } from 'unistore/full/preact';

/**
 * Label form for the U2F key.
 */
const FormName = ({ onSubmit, onCancel, addU2FKeyNameAction, settings: { addU2FKey: addU2FKeyStore } }) => {
    const model = { name: (addU2FKeyStore.response ? addU2FKeyStore.response.name : '') };
    console.debug(addU2FKeyStore);
    return (<form
        className={ModalStyles.wrapper}
        onSubmit={(e) => {
            e.preventDefault();
            addU2FKeyNameAction(model);
            onSubmit();
        }}
        onReset={(e) => {
            e.preventDefault();
            onCancel();
        }}>
        <div className={ModalStyles.content}>
            <div class={styles.name}>
                <label class={styles.label} htmlFor="name">
                    Name
                </label>
                <div class={styles.inputContainer}>
                    <input
                        onInput={({ target: { value } }) => {
                            model.name = value;
                        }}
                        value={model.name}
                        type="name"
                        id="inputName"
                        required
                        placeholder="Name"
                        class={styles.textInput}
                    />
                </div>
            </div>
        </div>
        <div class={ModalStyles.footer}>
            <button type="reset" value="Reset">
                Back
            </button>
            <button type="submit" value="Submit">
                Next
            </button>
        </div>
    </form>);
};

export default connect('settings', settingsActions)(FormName);
