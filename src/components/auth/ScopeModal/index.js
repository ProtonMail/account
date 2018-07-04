import PasswordModal from './ScopeFormModal';

import store from '../../../lib/store';
import actions from '../../../actions/scope';

export const steps = (scope) => {
    if (scope !== 'password') {
        return [];
    }
    return [
        {
            title: 'Confirm your identity',
            component: ({ params, onNextStep, onPreviousStep, onSkipStep }) => (
                <PasswordModal onSubmit={onNextStep} onCancel={onPreviousStep} skip={onSkipStep} params={params}/>)
        }
    ];
};

export const beforeClose = (props) => {
    const { resetScopeStateAction } = actions(store);
    resetScopeStateAction(store.getState());
};
