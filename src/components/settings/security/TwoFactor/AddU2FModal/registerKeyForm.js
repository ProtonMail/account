import { h, Component } from 'preact';
import { register } from 'u2f';

import { styles as ModalStyles } from '../../../../ui/Modal';
import styles from './index.css';

import image from './sign-u2f.png';
import appProvider from 'frontend-commons/src/appProvider';

export default class RegisterKeyModal extends Component {
    onRegisterSucceed ( result ) {
        this.setState({ result, status: 'success' });
    }

    onRegisterFails ( result ) {
        this.setState({ result, status: 'failure' });
    }

    onSubmit ( e ) {
        e.preventDefault();
        this.props.onSubmit({
            codes: [
                'd1e4822e',
                '2d83d85b',
                '717ebed4',
                'a9ffee38',
                'f34ebdf7',
                'd1321481',
                '2572f6cd',
                '39bd63b3',
                'c8016641',
                'a9b4cf9d',
                '8f475f77',
                '123d33b1'
            ]
        });
    }

    constructor () {
        super();
        this.state = {
            status: 'initialize',
            request: {
                Challenge: 'KGOcAJhmPwMKZ4r8vFb2vZZktLh9wZCmLKHxQQH1bxY',
                Versions: [ 'U2F_V2' ],
                RegisteredKeys: []
            }
        };
    }

    componentWillMount () {
        if (this.state.status === 'initialize') {
            const u2fConfig = appProvider.getConfig('u2f');
            register(this.state.request, u2fConfig.appID, u2fConfig.timeout)
                .then(this.onRegisterSucceed.bind(this))
                .catch(this.onRegisterFails.bind(this));
            this.setState({ status: 'waiting' });
        }
    }

    render () {
        const name = this.props.params.name;
        return (
            <form
                class={ModalStyles.wrapper}
                onSubmit={this.onSubmit.bind(this)}
                onReset={( e ) => {
                    e.preventDefault();
                    this.props.onCancel({});
                }}
            >
                <div class={[ styles[ 'RegisterKeyForm-container' ], ModalStyles.content ].join(' ')}>
                    <img src={image}/>

                    <div class={styles[ 'RegisterKeyForm-status' ]}>
                        <div>
                            <span>Activate your key</span>
                            <span>
                                {this.state.status === 'initialize' ? 'fetching' : this.state.status}...
                            </span>
                        </div>

                        <div>
                            <span>Name</span>
                            <span class={styles.label}>{name}</span>
                        </div>
                    </div>
                </div>
                <div class={ModalStyles.footer}>
                    <button type="reset" value="Reset">
                        Back
                    </button>
                    <button type="submit" value="Submit" disabled={this.state.status !== 'success'}>
                        Next
                    </button>
                </div>
            </form>
        );
    }
}
