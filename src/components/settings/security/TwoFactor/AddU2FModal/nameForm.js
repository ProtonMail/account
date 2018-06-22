import { h, Component } from 'preact';
import { styles as ModalStyles } from '../../../../ui/Modal';
import styles from './index.css';

export default class NameForm extends Component {
    onNameUpdated ( event ) {
        this.setState({ name: event.target.value });
    }

    onSubmit ( e ) {
        e.preventDefault();
        this.props.onSubmit({ name: this.state.name });
    }

    constructor () {
        super();
        this.state = {
            name: ''
        };
    }

    render () {
        return (
            <form
                className={ModalStyles.wrapper}
                onSubmit={this.onSubmit.bind(this)}
                onReset={( e ) => {
                    e.preventDefault();
                    this.props.onCancel({});
                }}
            >
                <div className={ModalStyles.content}>
                    <div class={styles[ 'NameForm-name' ]}>
                        <label htmlFor="name">
                            Name
                        </label>
                        <div>
                            <input
                                onChange={this.onNameUpdated.bind(this)}
                                value={this.state.name}
                                type="name"
                                id="inputName"
                                placeholder="Name"
                            />
                        </div>
                    </div>
                </div>
                <div class={ModalStyles.footer}>
                    <button type="reset" value="Reset">
                        Back
                    </button>
                    <button type="submit" value="Submit">
                        Next
                    </button>
                </div>
            </form>
        );
    }
}
