import { connect } from 'unistore/full/preact';
import settingsActions from '../../../../../actions/settings';

import { styles as ModalStyles } from '../../../../ui/Modal';
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
    console.debug('FormRegisterKey');
    console.debug({ addU2FKey });
    const { response: {name} = {}} = addU2FKey;
    addU2FKeyRegisterAction();

    return (
        <form
            class={ModalStyles.wrapper}
            onSubmit={(e) => onSubmit(e, onSubmitProps, resetStoreAction)}
            onReset={(e) => {
                e.preventDefault();
                props.onCancel();
            }}
        >
            <div class={[ styles[ 'RegisterKeyForm-container' ], ModalStyles.content ].join(' ')}>
                <img src={image}/>

                <div class={styles[ 'RegisterKeyForm-status' ]}>
                    <div>
                        <span>Activate your key</span>
                        <span>
                                {addU2FKey.status || 'fetching'}...
                            </span>
                    </div>

                    <div>
                        <span>Name</span>
                        <span class={styles.label}>{name}</span>
                    </div>
                </div>
            </div>
            <div class={ModalStyles.footer}>
                <button type="reset" value="Reset">
                    Back
                </button>
                <button type="submit" value="Submit" disabled={(addU2FKey.status !== 'finished')}>
                    Next
                </button>
            </div>
        </form>
    );
};

/**
 * Asks the user to press the button of the key, and calls the api.
 */
export default connect('settings', settingsActions)(FormRegisterKey);
