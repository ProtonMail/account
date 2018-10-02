import { h } from 'preact';

import style from './style.css';

/**
 * Button that has the appearance of a link.
 * @param {Function} onClick - handle for the click event.
 * @param {preact.Component[]} children
 * @returns {preact.Component}
 */
const TextButton = ({ onClick, children }) => (
    <a onClick={onClick} className={style.a} href="#">
        {children}
    </a>
);

export default TextButton;
