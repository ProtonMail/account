import { h, Component } from 'preact';
import AddU2FModalSteps from '../AddU2FModal';

import style from './style.css';
import SteppedModal from '../../../../ui/SteppedModal';

export default class U2FKeyList extends Component {

    /**
     * opens the AddU2FKey modal.
     */
    openModal() {
        this.setState({ U2FModalOpen: true });
    }

    /**
     * closes the AddU2FKey modal.
     */
    closeModal() {
        this.setState({ U2FModalOpen: false });
    }

    /**
     * @constructor
     * @param {Object} props
     * @param {Object[]} props.U2FKeys - the list of U2FKey
     * @param {Int} props.U2FKeys[].Compromised - whether the key is compromised or not.
     * @param {String} props.U2FKeys[].KeyHandle - The key handle of the current key.
     * @param {String} props.U2FKeys[].Label - The label of the current key.
     */
    constructor ( props ) {
        super(props);
        this.state = {
            U2FModalOpen: false
        };
    }

    /**
     * renders an U2F Key.
     * @param {Object} u2fKey - the U2F Key to render.
     * @param {Int} u2fKey.Compromised - whether the key is compromised or not.
     * @param {String} u2fKey.KeyHandle - The key handle of the current key.
     * @param {String} u2fKey.Label - The label of the current key.
     * @return {Component}
     */
    static renderU2FKey ( u2fKey ) {
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
