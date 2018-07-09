import { h, Component } from 'preact';

import style from './style.css';
import ConfirmModal from '../../../../ui/ConfirmModal';
import TextButton from '../../../../ui/TextButton';
import settingsActions from '../../../../../actions/settings';
import { connect } from 'unistore/full/preact';

class U2FKeyList extends Component {
    /**
     * renders an U2F Key.
     * @param {Object} u2fKey - the U2F Key to render.
     * @param {Int} u2fKey.Compromised - whether the key is compromised or not.
     * @param {String} u2fKey.KeyHandle - The key handle of the current key.
     * @param {String} u2fKey.Label - The label of the current key.
     * @return {Component}
     */
    renderU2FKey(u2fKey) {
        const headerClass = [style.listElementHeader];
        if (u2fKey.Compromised) headerClass.push(style.listElementHeaderCompromised);
        return (
            <li key={u2fKey.KeyHandle} class={style.listElement}>
                <div class={headerClass.join(' ')} style={{ marginRight: 'auto' }}>
                    {u2fKey.Label}
                </div>
                {!!u2fKey.Compromised && <div class={['badge', 'badge-danger'].join(' ')}>Compromised</div>}
                <button onClick={() => this.setState({
                    confirmDeleteModal: u2fKey
                })}>Delete
                </button>
            </li>
        );
    }

    render() {
        if (!this.props.U2FKeys.length) return null;

        const confirmDeleteModal = this.state.confirmDeleteModal;

        const closeModal = () => {
            this.setState({ confirmDeleteModal: "" });
        };
        return (
            <ul id="u2f-list" style={this.props.style} class={style.list}>
                <ConfirmModal
                    title="Confirm Security Key Deletion"
                    scope="password"
                    isOpen={!!confirmDeleteModal}
                    onAfterClose={closeModal}
                    onConfirm={() => {
                        this.props.deleteU2FKeyAction(confirmDeleteModal);
                    }}
                    onCancel={() => {
                    }}
                >
                    <div>
                        Are you sure you want to delete the
                        key <span>{confirmDeleteModal ? confirmDeleteModal.Label : ''}</span>?
                    </div>
                </ConfirmModal>
                <li class={style.listHeader}>
                    <div>U2F Keys</div>
                    <div>
                        <TextButton onClick={this.props.openModal} href="#">
                            Add a new key
                        </TextButton>
                    </div>
                </li>
                {this.props.U2FKeys.map(this.renderU2FKey.bind(this))}
            </ul>
        );
    }
}

export default connect('settings', settingsActions)(U2FKeyList);
