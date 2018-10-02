import { h, Component } from 'preact';
import _ from 'lodash';

import { Content, Footer, Wrapper } from './Modal';
import SteppedModal from './SteppedModal';
import { steps as scopeModalSteps, beforeDismiss as beforeDismissScopeModal } from '../auth/ScopeModal';

export default class ConfirmModal extends Component {
    // for some reason, using stateless components produces a Build error...
    render() {
        const {
            children,
            title,
            isOpen,
            onConfirm,
            onAfterClose,
            scope = _.noop,
            onCancel = _.noop,
            cancelText = 'Cancel',
            confirmText = 'Confirm'
        } = this.props;
        const steps = [
            {
                title,
                component: ({ onNextStep, onPreviousStep }) => (
                    <Wrapper
                        onSubmit={(e) => {
                            e.preventDefault();
                            onNextStep();
                        }}
                        onReset={(e) => {
                            e.preventDefault();
                            if (onCancel) {
                                onPreviousStep();
                            }
                            onAfterClose();
                        }}
                    >
                        <Content>{children}</Content>
                        <Footer>
                            <button type="reset" value="Reset">
                                {cancelText}
                            </button>
                            <button type="submit" value="Submit">
                                {confirmText}
                            </button>
                        </Footer>
                    </Wrapper>
                )
            }
        ];

        if (scope) {
            steps.push(...scopeModalSteps(scope));
        }

        const beforeDismiss = async (success) => {
            if (success) {
                await onConfirm();
            }
            if (scope) {
                beforeDismissScopeModal();
            }
        };

        return (
            <SteppedModal isOpen={isOpen} onRequestClose={onAfterClose} steps={steps} beforeDismiss={beforeDismiss} />
        );
    }
}
