import { h, cx } from 'preact';

import style from './style';

/**
 * Lists the U2FKeys, given as props.
 * @param {Object} props
 * @param {Object[]} props.U2FKeys
 * @return {null|Component}
 */
export default ( { U2FKeys, style: propsStyle = {} } ) => {
    if (!U2FKeys.length) return null;
    return <ul id="u2f-list" style={propsStyle}>
        <li className={style.listHeader}>
            <p>U2F Keys</p>
            <p><a href="#">Add a new key</a></p>
        </li>
        {U2FKeys.map(u2fKey => (<li key={u2fKey.KeyHandle} className={style.listElement}>
                <p>{u2fKey.Label}</p>
                <button>Delete</button>
            </li>)
        )}
    </ul>;
}
