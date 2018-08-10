import { connect } from 'unistore/full/preact';

import { Content as ModalContent, Footer as ModalFooter, Wrapper as ModalWrapper } from '../../../../ui/Modal';
import settingsActions from '../../../../../actions/settings';

import styles from './index.css';

/**
 * Label form for the U2F key.
 */
export const FormName = ({ onSubmit, onCancel, addU2FKeyLabelAction, settings: { addU2FKey: addU2FKeyStore } }) => {
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
            <div className={styles.name}>
                <label className={styles.nameLabel} htmlFor="name">
                    Name
                </label>
                <div className={styles.nameInputContainer}>
                    <input
                        onInput={({ target: { value } }) => {
                            model.label = value;
                        }}
                        value={model.label}
                        type="name"
                        id="inputName"
                        required
                        placeholder="Name"
                        className={styles.nameTextInput}
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
