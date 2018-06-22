import { h, Component } from 'preact';
import AddU2FModalSteps from '../AddU2FModal';

import style from './style.css';
import SteppedModal from '../../../../ui/SteppedModal';

export default class U2FKeyList extends Component {
    constructor() {
        super();
        this.state = {
            U2FModalOpen: false
        };
    }

    openModal() {
        this.setState({ U2FModalOpen: true });
    }

    closeModal() {
        this.setState({ U2FModalOpen: false });
    }

    static renderU2FKey(u2fKey) {
        const headerClass = [style.listElementHeader];
        if (u2fKey.Compromised) headerClass.push(style.listElementHeaderCompromised);
        return (
            <li key={u2fKey.KeyHandle} class={style.listElement}>
                <div class={headerClass.join(' ')} style={{ marginRight: 'auto' }}>
                    {u2fKey.Label}
                </div>
                {!!u2fKey.Compromised && <div class={['badge', 'badge-danger'].join(' ')}>Compromised</div>}
                <button>Delete</button>
            </li>
        );
    }

    render() {
        if (!this.props.U2FKeys.length) return null;

        return (
            <ul id="u2f-list" style={this.props.style} class={style.list}>
                <SteppedModal
                    isOpen={this.state.U2FModalOpen}
                    handleCloseModal={this.closeModal.bind(this)}
                    steps={AddU2FModalSteps}
                />
                <li class={style.listHeader}>
                    <div>U2F Keys</div>
                    <div>
                        <a onClick={this.openModal.bind(this)} href="#">
                            Add a new key
                        </a>
                    </div>
                </li>
                {this.props.U2FKeys.map(U2FKeyList.renderU2FKey.bind(this))}
            </ul>
        );
    }
}
