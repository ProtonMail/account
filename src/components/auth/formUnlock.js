import { h } from 'preact';

const formUnlock = ({ unlock }) => {

    const model = {};

    return (<form
        name="formLogin"
        method="post"
        novalidate
        onsubmit={( e ) => (e.preventDefault(), unlock(model))}>
        <fieldset>
            <div>
                <label for="passwordUnlock">Unlock</label>
                <input
                  type="password"
                  autofocus
                  autocapitalize="off"
                  autocorrect="off"
                  name="passwordUnlock"
                  required
                  id="passwordUnlock"
                  oninput={({ target: { value }}) => {
                    model.passwordUnlock = value;
                  }} />
            </div>
        </fieldset>

        <button>Send</button>
    </form>);
};

export default formUnlock;
