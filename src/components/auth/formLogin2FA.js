import { h } from 'preact';
import FormSignU2F from './formSignU2F';
import style from './style.css';

const formLogin2FA = ({ login2FA, twoFactorData: { isTOTP = true, U2F: U2FRequest } }) => {
    const model = {};
    return (<form onsubmit={e => (e.preventDefault(), login2FA(model))}>
        <fieldset>
            {isTOTP && U2FRequest && <legend> Choose one of the following 2FA methods </legend>}
            {isTOTP && (<div>
                <label htmlFor="password2FA">2FA code</label>
                <div class={style.twoFactorOption}>
                    <input
                        type="text"
                        name="password2FA"
                        id="password2FA"
                        autocapitalize="off"
                        autocorrect="off"
                        autocomplete="off"
                        type="text"
                        minlength="6"
                        maxlength="8"
                        required
                        oninput={({ target: { value } }) => {
                            model.password2FA = value;
                        }}/>
                </div>
            </div>)}

            {U2FRequest && (<div>
                <label htmlFor="u2fKey">Security key</label>
                <FormSignU2F id="u2fKey" class={style.twoFactorOption}/>
            </div>)}
        </fieldset>

        <button>Login</button>
    </form>);
};

export default formLogin2FA;
