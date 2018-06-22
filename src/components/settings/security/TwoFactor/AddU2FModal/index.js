import Presentation from './presentation';
import NameForm from './nameForm';
import RegisterKeyForm from './registerKeyForm';
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
        component: (params, onSubmit, onCancel) => <NameForm params={params} onSubmit={onSubmit} onCancel={onCancel} />
    },
    {
        title: 'Register new U2F Key',
        component: (params, onSubmit, onCancel) => (
            <RegisterKeyForm params={params} onSubmit={onSubmit} onCancel={onCancel} />
        )
    },
    ...RecoveryCodeSteps
];
