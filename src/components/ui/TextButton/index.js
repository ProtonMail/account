import style from './style.css';

/**
 * Button that has the appearance of a link.
 * @param {Function} onClick - handle for the click event.
 * @param {preact.Component[]} children
 * @returns {preact.Component}
 */
export default ({ onClick, children }) => (
    <button type="button" onClick={onClick} class={style.button}>{children}</button>
);
