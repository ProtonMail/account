import { h } from 'preact';
import FormSignU2F from './formSignU2F';

const formLogin2FA = ({ login2FA, twoFactorData: { isTOTP = true, U2F: U2FRequest } }) => {
    const model = {};
    return (<form onsubmit={e => (e.preventDefault(), login2FA(model))}>
        {isTOTP && U2FRequest && <p> Choose one of the following 2FA methods </p>}
        <fieldset>
            {isTOTP && (<div>
                <label for="password2FA">2FA</label>
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
            </div>)}

            {U2FRequest && <FormSignU2F/>}
        </fieldset>

        <button>Login</button>
    </form>);
};

export default formLogin2FA;
