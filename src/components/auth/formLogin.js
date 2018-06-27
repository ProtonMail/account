import { h } from 'preact';

const formLogin = ({ login }) => {
    const model = {
        username: 'dew1527087668398',
        password: 'test'
    };

    return (
        <form name="formLogin" method="post" novalidate onsubmit={(e) => (e.preventDefault(), login(model))}>
            <fieldset>
                <div>
                    <label for="login">Login</label>
                    <input
                        type="text"
                        name="login"
                        autofocus
                        autocapitalize="off"
                        autocorrect="off"
                        id="login"
                        required
                        value={model.username}
                        placeholder="Username"
                        oninput={({ target: { value } }) => {
                            model.username = value;
                        }}
                    />
                </div>

                <div>
                    <label for="password">password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={model.password}
                        placeholder="Password"
                        oninput={({ target: { value } }) => {
                            model.password = value;
                        }}
                    />
                </div>
            </fieldset>

            <button>Login</button>
        </form>
    );
};

export default formLogin;
