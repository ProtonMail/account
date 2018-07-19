import Presentation from './presentation';
import TestCode from './formTestCode';
import { steps as ScopeModal, beforeClose as beforeCloseScopeModal } from '../../../../auth/ScopeModal';
import store from '../../../../../helpers/store';
import actions from '../../../../../actions/settings';

export const steps = [
    ...ScopeModal('password'),
    {
        title: 'Save your recovery codes',
        mustSucceed: true,
        component: ({ params, onNextStep, onPreviousStep, onReset }) => (<Presentation
            params={params}
            onSubmit={onNextStep}
            onCancel={onPreviousStep}
            onReset={onReset}
        />)
    },
    {
        title: 'Test your recovery codes',
        mustSucceed: true,
        component: ({ params, onNextStep, onPreviousStep }) => (<TestCode
            params={params}
            onSubmit={onNextStep}
            onCancel={onPreviousStep}
        />)
    }
];

export const beforeClose = () => {
    beforeCloseScopeModal();
    const { resetStoreAction } = actions(store);

    resetStoreAction(store.getState(), ['reset2FARecoveryCodes']);
};
