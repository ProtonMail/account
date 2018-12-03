import { h } from 'preact';
import ReactModal from 'react-modal';

import ModalStyles from './index.css';

/**
 * Creates a new modal, using a predefined style.
 * @param {boolean} isOpen - Whether the modal is open or not.
 * @param {string} title - Title of the modal.
 * @param {Component} children
 * @param {Function} onRequestClose - called after the modal is closed.
 * @param {Function} onBeforeClose - called after the modal is closed.
 * @param {Function} onAfterOpen - called after the modal is opened.
 * @param {String} contentLabel- the content label. If not given, title is used.
 * @return {ReactModal} the modal components.
 * @function
 */
const Modal = ({ isOpen, title, children, onRequestClose, onAfterOpen, contentLabel }) => {
    ReactModal.setAppElement('#app');
    return (
        <ReactModal
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel || title}
            className={ModalStyles.modal}
        >
            <header className={ModalStyles.header}>
                <h3>{title}</h3>
            </header>
            {children}
        </ReactModal>
    );
};

export default Modal;
export { default as Content } from './Content';
export { default as Footer } from './Footer';
export { default as Wrapper } from './Wrapper';
