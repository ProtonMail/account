import { h } from 'preact';

import Link from '../../../../ui/Link';
import { Content as ModalContent, Footer as ModalFooter, Wrapper as ModalWrapper } from '../../../../ui/Modal';

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
                <p>
                    This wizard will enable Two Factor Authentication (2FA) on your ProtonMail account. 2FA will make
                    your ProtonMail account more secure so we recommend enabling it.{' '}
                </p>
                <p>
                    <strong>
                        If you have never used 2FA before, we strongly recommend you reading our 2FA Guide first.
                    </strong>
                </p>
                <div>
                    <Link href="https://protonmail.com/support/knowledge-base/two-factor-authentication/">
                        2FA GUIDE
                    </Link>
                </div>
            </ModalContent>
        )}
        <ModalFooter>
            <button type="reset" value="Reset">
                Cancel
            </button>
            <button type="submit" value="Submit">
                Next
            </button>
        </ModalFooter>
    </ModalWrapper>
);

export default Presentation;
