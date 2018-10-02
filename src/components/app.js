import { h } from 'preact';
import { Router, route } from 'preact-router';
import { connect } from 'unistore/full/preact';
import appProvider from 'frontend-commons/src/appProvider';
import { isLoggedIn as isAuthenticated } from 'frontend-commons/src/user/model';

import config from '../config';
import Header from './header';
import Home from '../routes/home';
import Settings from '../routes/settings';
import Dashboard from '../routes/dashboard';
import authActions from '../actions/authentication';
import NotificationStack from './ui/NotificationStack';

appProvider.setConfig(config);

export default connect(
    'auth',
    authActions
)(({ auth, loadAuthUserAction, logoutAction }) => {
    /**
     * Check if the user is authenticated or not.
     * Redirect to the login if he is not or load the config
     * @link  {https://github.com/developit/preact-router#detecting-route-changes}
     */
    const onChangeRoute = async ({ previous, url }) => {
        if (!isAuthenticated()) {
            return route('/');
        }

        if (url !== previous && previous !== '/' && !auth.isLoggedIn) {
            await loadAuthUserAction(auth.user);
        }
    };
    return (
        <div id="app">
            <Header isLoggedIn={auth.isLoggedIn} logout={logoutAction} />
            <Router onChange={onChangeRoute}>
                <Home path="/" />
                <Dashboard path="/dashboard" config={auth.config} user={auth.user} />
                <Settings path="/settings/:side?" config={auth.config} user={auth.user} />
            </Router>
            <NotificationStack />
        </div>
    );
});
