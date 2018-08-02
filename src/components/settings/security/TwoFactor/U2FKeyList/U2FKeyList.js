import { h, Component } from 'preact';

import style from './style.css';
import ConfirmModal from '../../../../ui/ConfirmModal';
import TextButton from '../../../../ui/TextButton';
import settingsActions from '../../../../../actions/settings';
import { connect } from 'unistore/full/preact';


export class U2FKeyList extends Component {
    /**
     * renders an U2F Key.
     * @param {Object} u2fKey - the U2F Key to render.
     * @param {Int} u2fKey.Compromised - whether the key is compromised or not.
     * @param {String} u2fKey.KeyHandle - The key handle of the current key.
     * @param {String} u2fKey.Label - The label of the current key.
     * @return {Component}
     */
    renderU2FKey(u2fKey) {
        const headerClasses = [style.listElementHeader];
        if (u2fKey.Compromised) {
            headerClasses.push(style.listElementHeaderCompromised);
        }

        return (
            <li key={u2fKey.KeyHandle} class={style.listElement}>
                <div class={headerClasses.join(' ')}>
                    {u2fKey.Label}
                </div>
                {!!u2fKey.Compromised && <div class='badge badge-danger'>Compromised</div>}
                <button onClick={() => this.setState({
                    confirmDeleteModal: u2fKey
                })}>Delete
                </button>
            </li>
        );
    }

    render() {
        const confirmDeleteModal = this.state.confirmDeleteModal;

        const closeModal = () => {
            this.setState({ confirmDeleteModal: ''});
        };
        return (
            <ul class={style.list}>
                <ConfirmModal
                    title="Confirm Security Key Deletion"
                    scope="password"
                    isOpen={!!confirmDeleteModal}
                    onAfterClose={closeModal}
                    onConfirm={() => this.props.deleteU2FKeyAction(confirmDeleteModal)}
                    onCancel={() => {
                    }}
                >
                    <div>
                        Are you sure you want to delete the
                        key <span>{confirmDeleteModal ? confirmDeleteModal.Label : ''}</span>?
                    </div>
                </ConfirmModal>
                {this.props.U2FKeys.map((u2fKey) => this.renderU2FKey(u2fKey))}
            </ul>
        );
    }
}

export default connect('settings', settingsActions)(U2FKeyList);
