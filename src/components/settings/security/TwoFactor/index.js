import { h } from 'preact';
import { connect } from 'unistore/full/preact';

import style from './style';

import U2FKeyList from './U2FKeyList/U2FKeyList';

function mapStateToProps ( { auth } ) {
    return { user: auth.user };
}

export default connect(mapStateToProps)(( { user } ) => {
    if (!Object.keys(user).length) return null;
    const { TwoFactor, TOTP, U2FKeys } = user;
    return (
        <div class={style.twoFactor}>
            <h2>Two-Factor Authentication</h2>
            <p> Two-factor authentication is currently {TwoFactor ? 'on' : 'off'}.</p>
            <div id="totp" class={style.item}>
                <p style={{ flex: 2 }}>2FA via Application</p>
                <button style={{ flex: 1 }}>{TOTP ? 'Disable' : 'Enable'}</button>
                <p style={{ flex: 2 }}>
                    <a href="#">Regenerate recovery codes</a>
                    <i> i</i>
                </p>
            </div>
            <div id="u2f" class={style.item}>
                <p style={{ flex: 2 }}>2FA via Security Key</p>
                <button style={{ flex: 1 }}>{U2FKeys.length ? 'Disable' : 'Enable'}</button>
            </div>
            <U2FKeyList U2FKeys={U2FKeys}/>
        </div>
    );
});
