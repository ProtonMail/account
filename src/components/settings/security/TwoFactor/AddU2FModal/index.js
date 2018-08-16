import Presentation from './presentation';
import FormName from './formName';
import RegisterKeyForm from './formRegisterKey';
import { steps as RecoveryCodeSteps, beforeDismiss as beforeDismissRecoveryCodeModal } from '../SaveRecoveryCodeModal';
import { steps as ScopeModal, beforeDismiss as beforeDismissScopeModal } from '../../../../auth/ScopeModal/index';
import store from '../../../../../helpers/store';
import actions from '../../../../../actions/settings';

export const steps = [
    {
        title: 'Register new U2F Key',
        component: ({  onNextStep, onPreviousStep, message }) => (
            <Presentation  onSubmit={onNextStep} onCancel={onPreviousStep} message={message}/>
        )
    },
    ...ScopeModal('password'),
    {
        title: 'Name your U2F Key',
        component: ({ onNextStep, onPreviousStep }) => (<FormName
            onSubmit={onNextStep}
            onCancel={onPreviousStep}
        />)
    },
    {
        title: 'Register new U2F Key',
        component: ({ onNextStep, onPreviousStep, forbidClosure, onReset }) => (<RegisterKeyForm
            onSubmit={onNextStep}
            onCancel={onPreviousStep}
            forbidClosure={forbidClosure}
            onReset={onReset}
        />)
    },
    ...RecoveryCodeSteps
];

export const beforeDismiss = () => {
    beforeDismissScopeModal();
    beforeDismissRecoveryCodeModal();
    const { resetStoreAction } = actions(store);
    resetStoreAction(store.getState(), ['addU2FKey']);
};
