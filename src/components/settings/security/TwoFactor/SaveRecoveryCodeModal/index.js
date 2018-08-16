import Presentation from './presentation';
import TestCode from './formTestCode';
import { steps as ScopeModal, beforeDismiss as beforeDismissScopeModal } from '../../../../auth/ScopeModal';
import store from '../../../../../helpers/store';
import actions from '../../../../../actions/settings';

export const steps = [
    ...ScopeModal('password'),
    {
        title: 'Save your recovery codes',
        mustSucceed: true,
        component: ({ onNextStep, onPreviousStep, onReset }) => (<Presentation
            onSubmit={onNextStep}
            onCancel={onPreviousStep}
            onReset={onReset}
        />)
    },
    {
        title: 'Test your recovery codes',
        mustSucceed: true,
        component: ({ onNextStep, onPreviousStep }) => (<TestCode
            onSubmit={onNextStep}
            onCancel={onPreviousStep}
        />)
    }
];

export const beforeDismiss = () => {
    beforeDismissScopeModal();
    const { resetStoreAction } = actions(store);

    resetStoreAction(store.getState(), ['reset2FARecoveryCodes']);
};
