import Presentation from './presentation';
import FormName from './formName';
import RegisterKeyForm from './formRegisterKey';
import { steps as RecoveryCodeSteps, beforeClose as beforeCloseRecoveryCodeModal } from '../SaveRecoveryCodeModal';
import { steps as ScopeModal, beforeClose as beforeCloseScopeModal } from '../../../../auth/ScopeModal/index';
import store from '../../../../../lib/store';
import actions from '../../../../../actions/settings';

export const steps = [
    {
        title: 'Register new U2F Key',
        component: ({ params, onNextStep, onPreviousStep }) => (
            <Presentation params={params} onSubmit={onNextStep} onCancel={onPreviousStep}/>
        )
    },
    ...ScopeModal('password'),
    {
        title: 'Name your U2F Key',
        component: ({ params, onNextStep, onPreviousStep }) => (<FormName
            params={params}
            onSubmit={onNextStep}
            onCancel={onPreviousStep}
        />)
    },
    {
        title: 'Register new U2F Key',
        component: ({ params, onNextStep, onPreviousStep, forbidCancel }) => (<RegisterKeyForm
            params={params}
            onSubmit={onNextStep}
            onCancel={onPreviousStep}
            forbidCancel={forbidCancel}
        />)
    },
    ...RecoveryCodeSteps
];

export const beforeClose = () => {
    beforeCloseScopeModal();
    beforeCloseRecoveryCodeModal();
    const { resetStoreAction } = actions(store);
    resetStoreAction(store.getState(), ['addU2FKey']);
};
