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
            component: ({ params, onNextStep, onPreviousStep, onSkipStep, message }) => (
                <ScopeFormModal
                    onSubmit={onNextStep}
                    onCancel={onPreviousStep}
                    skip={onSkipStep}
                    params={params}
                    message={message}/>)
        }
    ];
};

export const beforeClose = () => {
    const { resetScopeStateAction } = actions(store);
    resetScopeStateAction(store.getState());
};
