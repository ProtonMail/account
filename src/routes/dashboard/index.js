import { h, Component } from 'preact';
import { route } from 'preact-router';
import { isLoggedIn, get as getUser } from 'frontend-commons/src/user/model';

import { logout } from '../../actions/auth';

export default class Dashboard extends Component {

    componentWillMount() {
        if (!isLoggedIn()) {
            return route('/');
        }
        this.setState({ user: getUser() });
    }

    render({ user, config }) {

        const userData = user || this.state.user ||  getUser();

        return (<div id="dashboard" style="margin-top: 100px">
                <h1>Bonjour <b>{userData.Name}</b></h1>
        </div>);
    }
}
