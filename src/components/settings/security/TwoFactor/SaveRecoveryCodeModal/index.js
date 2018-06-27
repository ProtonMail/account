import Presentation from './presentation';
import TestCode from './formTestCode';

export default [
    {
        title: 'Save your recovery codes',
        mustSucceed: true,
        component: (params, onSubmit, onCancel) => (
            <Presentation params={params} onSubmit={onSubmit} onCancel={onCancel} />
        )
    },
    {
        title: 'Test your recovery codes',
        mustSucceed: true,
        component: (params, onSubmit, onCancel) => <TestCode params={params} onSubmit={onSubmit} onCancel={onCancel} />
    }
];
