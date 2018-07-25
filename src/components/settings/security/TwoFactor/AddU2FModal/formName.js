import { Content as ModalContent, Footer as ModalFooter, Wrapper as ModalWrapper } from '../../../../ui/Modal';

import styles from './index.css';
import settingsActions from '../../../../../actions/settings';
import { connect } from 'unistore/full/preact';

/**
 * Label form for the U2F key.
 */
const FormName = ({ onSubmit, onCancel, addU2FKeyLabelAction, settings: { addU2FKey: addU2FKeyStore } }) => {
    const model = { label: (addU2FKeyStore.response ? addU2FKeyStore.response.label : '') };
    return (<ModalWrapper
        onSubmit={(e) => {
            e.preventDefault();
            addU2FKeyLabelAction(model.label);
            onSubmit();
        }}
        onReset={(e) => {
            e.preventDefault();
            onCancel();
        }}>
        <ModalContent>
            <div class={styles.name}>
                <label class={styles.nameLabel} htmlFor="name">
                    Name
                </label>
                <div class={styles.nameInputContainer}>
                    <input
                        onInput={({ target: { value } }) => {
                            model.label = value;
                        }}
                        value={model.label}
                        type="name"
                        id="inputName"
                        required
                        placeholder="Name"
                        class={styles.nameTextInput}
                        ref={input => input && input.focus()}
                    />
                </div>
            </div>
        </ModalContent>
        <ModalFooter>
            <button type="reset" value="Reset">
                Back
            </button>
            <button type="submit" value="Submit">
                Next
            </button>
        </ModalFooter>
    </ModalWrapper>);
};

export default connect('settings', settingsActions)(FormName);
