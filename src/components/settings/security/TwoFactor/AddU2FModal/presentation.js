import { Content as ModalContent, Footer as ModalFooter, Wrapper as ModalWrapper } from '../../../../ui/Modal';


/**
 * Shows information about the U2F Key usage.
 * @param {Object} props
 * @param {Function} props.onSubmit - triggers the next step.
 * @param {Function} props.onCancel - triggers the previous step.
 * @return {*}
 */
export default ( { onSubmit, onCancel } ) => (
    <ModalWrapper
        onSubmit={( e ) => {
            e.preventDefault();
            onSubmit();
        }}
        onReset={( e ) => {
            e.preventDefault();
            onCancel();
        }}
    >
        <ModalContent>
            <p>This wizard will add a new security key to your Proton Account. </p>
            <p>
                Please note that you will not be able to access your account if you loose your U2F device and your
                recovery codes. We recommend setting up a second 2FA method as a backup.
            </p>
            <p>
                <strong>
                    If you have never used 2FA before, we strongly recommend you reading our 2FA Guide first.
                </strong>
            </p>
            <div>
                <a class="button" href="https://protonmail.com/blog/" target="_blank" rel="noopener noreferrer" >
                    READ 2FA GUIDE
                </a>
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
    </ModalWrapper>
);
