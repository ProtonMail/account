import ReactModal from 'react-modal';
import ModalStyles from './index.css';

export const styles = ModalStyles;

export default ( { isOpen, title, children, buttons, onRequestClose, onAfterOpen, contentLabel = null } ) => {
    ReactModal.setAppElement('#app');
    return (<ReactModal
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onRequestClose}
        contentLabel={contentLabel || title}
        className={ModalStyles.modal}
    >
        <header class={ModalStyles.header}><h3>{title}</h3></header>
        {children}

    </ReactModal>);
};
