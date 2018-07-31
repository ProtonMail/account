import Presentation from './presentation';
import SharedSecret from './sharedSecret';
import { steps as RecoveryCodeSteps, beforeDismiss as beforeDismissRecoveryCodeModal } from '../SaveRecoveryCodeModal';
import { steps as ScopeModal, beforeDismiss as beforeDismissScopeModal } from '../../../../auth/ScopeModal/index';
import store from '../../../../../helpers/store';
import actions from '../../../../../actions/settings';
import ConfirmCode from './confirmCode';

export const steps = [
    {
        title: 'Set Up Two Factor Authentication',
        component: ({ onNextStep, onPreviousStep, message }) => (
            <Presentation onSubmit={onNextStep} onCancel={onPreviousStep} message={message}/>
        )
    },
    ...ScopeModal('password'),
    {
        title: 'Set Up Two Factor Authentication',
        component: ({ onNextStep, onPreviousStep }) => (<SharedSecret
            onSubmit={onNextStep}
            onCancel={onPreviousStep}
        />)
    },
    {
        title: 'Confirm your new method',
        component: ({ onNextStep, onPreviousStep, onReset, forbidClosure }) => (<ConfirmCode
            onSubmit={onNextStep}
            onCancel={onPreviousStep}
            onReset={onReset}
            forbidClosure={forbidClosure}
        />)
    },
    ...RecoveryCodeSteps
];

export const beforeDismiss = (success = false, reset = false) => {
    beforeDismissScopeModal();
    beforeDismissRecoveryCodeModal();
    if (success || !reset) {
        const { resetStoreAction } = actions(store);
        resetStoreAction(store.getState(), ['setupTOTP']);
    }
};
