import { connect } from 'unistore/full/preact';
import settingsActions from '../../../../../actions/settings';

import { Content as ModalContent, Footer as ModalFooter, Wrapper as ModalWrapper } from '../../../../ui/Modal';

import styles from './index.css';

import image from './sign-u2f.png';

/**
 * Called when the next button is pressed.
 * @param e
 * @param onSubmitProps
 * @param resetStoreAction
 */
const onSubmit = (e, onSubmitProps, resetStoreAction) => {
    e.preventDefault();
    onSubmitProps();
    resetStoreAction(['addU2FKey']);
};

const FormRegisterKey = ({ settings: { addU2FKey }, onCancel, onSubmit: onSubmitProps, addU2FKeyRegisterAction, resetStoreAction }) => {
    const { response: {name} = {}} = addU2FKey;
    addU2FKeyRegisterAction();

    return (
        <ModalWrapper
            onSubmit={(e) => onSubmit(e, onSubmitProps, resetStoreAction)}
            onReset={(e) => {
                e.preventDefault();
                props.onCancel();
            }}
        >
            <ModalContent class={styles.container}>
                <img src={image}/>

                <div class={styles.status}>
                    <div class={styles.row}>
                        <span class={styles.text}>Activate your key</span>
                        <span class={styles.text}>
                            {addU2FKey.status || 'fetching'}...
                        </span>
                    </div>

                    <div class={styles.row}>
                        <span class={styles.text}>Name</span>
                        <span class={[ styles.text, styles.label ].join(' ')}>{name}</span>
                    </div>
                </div>
            </ModalContent>
            <ModalFooter>
                <button type="reset" value="Reset">
                    Back
                </button>
                <button type="submit" value="Submit" disabled={(addU2FKey.status !== 'finished')}>
                    Next
                </button>
            </ModalFooter>
        </ModalWrapper>
    );
};

/**
 * Asks the user to press the button of the key, and calls the api.
 */
export default connect('settings', settingsActions)(FormRegisterKey);
