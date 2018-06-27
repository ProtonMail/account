import Presentation from './presentation';
import FormName from './formName';
import RegisterKeyForm from './formRegisterKey';
import RecoveryCodeSteps from '../SaveRecoveryCodeModal';

export default [
    {
        title: 'Register new U2F Key',
        component: (params, onSubmit, onCancel) => (
            <Presentation params={params} onSubmit={onSubmit} onCancel={onCancel} />
        )
    },
    {
        title: 'Name your U2F Key',
        component: (params, onSubmit, onCancel) => <FormName params={params} onSubmit={onSubmit} onCancel={onCancel} />
    },
    {
        title: 'Register new U2F Key',
        component: (params, onSubmit, onCancel) => (
            <RegisterKeyForm params={params} onSubmit={onSubmit} onCancel={onCancel} />
        )
    },
    ...RecoveryCodeSteps
];
