import { styles as ModalStyles } from '../../../../ui/Modal';

export default ( { onSubmit, onCancel } ) => (
    <form
        class={ModalStyles.wrapper}
        onSubmit={( e ) => {
            e.preventDefault();
            onSubmit({});
        }}
        onReset={( e ) => {
            e.preventDefault();
            onCancel();
        }}
    >
        <div class={ModalStyles.content}>
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
        </div>
        <div class={ModalStyles.footer}>
            <button type="reset" value="Reset">
                Back
            </button>
            <button type="submit" value="Submit">
                Next
            </button>
        </div>
    </form>
);
