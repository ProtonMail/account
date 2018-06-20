import { h, cx } from 'preact';

import style from './style.css';
import globalStyle from '../../../../../style/index.css';

/**
 * Lists the U2FKeys, given as props.
 * @param {Object} props
 * @param {Object[]} props.U2FKeys
 * @return {null|Component}
 */
export default ( { U2FKeys, style: propsStyle = {} } ) => {
    if (!U2FKeys.length) return null;

    console.debug({ globalStyle });

    return <ul id="u2f-list" style={propsStyle} class={style.list}>
        <li class={style.listHeader}>
            <div>U2F Keys</div>
            <div><a href="#">Add a new key</a></div>
        </li>
        {U2FKeys.map(u2fKey => {
                const headerClass = [ style.listElementHeader ];
                if (u2fKey.Compromised) headerClass.push(style.listElementHeaderCompromised);
                return (<li key={u2fKey.KeyHandle} class={style.listElement}>
                    <div class={headerClass.join(' ')} style={{ marginRight: 'auto' }}>{u2fKey.Label}</div>
                    {!!u2fKey.Compromised && (
                        <div class={[ 'badge', 'badge-danger' ].join(' ')}>Compromised</div>
                    )}
                    <button>Delete</button>
                </li>);
            }
        )}
    </ul>;
}
