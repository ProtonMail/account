import { h, Component } from 'preact';
import { sign } from 'u2f';
import appProvider from 'frontend-commons/src/appProvider';

class FormSignU2F extends Component {
    componentDidMount () {
        const u2fConfig = appProvider.getConfig('u2f');

        sign(this.props.request, u2fConfig.appID, u2fConfig.timeout)
            .then(this.props.onSignFinished)
            .catch(( e ) => console.error({ error: e }));

    }

    render () {
        return (<div>
            <p>Please press your authentication device.</p>
        </div>);

    }
}

export default FormSignU2F;
