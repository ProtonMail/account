import ScopeFormModal from './ScopeFormModal';
import store from '../../../helpers/store';
import actions from '../../../actions/scope';

export const steps = (scope) => {
    if (scope !== 'password') {
        return [];
    }
    return [
        {
            title: 'Confirm your identity',
            component: ({ onNextStep, onPreviousStep, onSkipStep, message }) => (
                <ScopeFormModal onSubmit={onNextStep} onCancel={onPreviousStep} skip={onSkipStep} message={message} />
            )
        }
    ];
};

export const beforeDismiss = () => {
    const { resetScopeStateAction } = actions(store);
    resetScopeStateAction(store.getState());
};
