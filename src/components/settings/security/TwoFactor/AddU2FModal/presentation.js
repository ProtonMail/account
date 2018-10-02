import { h } from 'preact';

import { Content as ModalContent, Footer as ModalFooter, Wrapper as ModalWrapper } from '../../../../ui/Modal';
import Link from '../../../../ui/Link';

/**
 * Shows information about the U2F Key usage.
 * @param {Object} props
 * @param {Function} props.onSubmit - triggers the next step.
 * @param {Function} props.onCancel - triggers the previous step.
 * @return {*}
 */
const Presentation = ({ onSubmit, onCancel, message }) => (
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
        {message ? (
            <ModalContent>
                <div>{message}</div>
            </ModalContent>
        ) : (
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
                    <Link href="https://protonmail.com/blog/">READ U2F GUIDE </Link>
                </div>
            </ModalContent>
        )}
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

export default Presentation;
