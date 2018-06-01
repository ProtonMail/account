import { h } from "preact"

const formLogin2Fa = ({ login2FA }) => (
    <form onsubmit={e => (e.preventDefault(),login2FA(model))}>

    <fieldset>
      <div>
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
          oninput={({ target: { value }}) => {
            model.password2FA = value;
          }} />
      </div>
    </fieldset>

    <button>Login</button>
  </form>
);

export default formLogin2Fa;