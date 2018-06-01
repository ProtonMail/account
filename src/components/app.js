import { h, Component } from 'preact';
import { Router, route } from 'preact-router';

import appProvider from 'frontend-commons/src/appProvider';
import appDispatcher from 'frontend-commons/src/utils/appDispatcher';

import config from '../config';
import Header from './header';
import Home from '../routes/home';
import Dashboard from '../routes/dashboard';
import { loadAuthUser } from '../actions/auth';

appProvider.setConfig(config);

if (module.hot) {
	require('preact/debug');
}

const authEvent = appDispatcher('auth');

export default class App extends Component {



	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	componentWillMount() {
	    loadAuthUser()
	        .then((state) => {
	          this.setState(state);
	          state.isLoggedIn && route('/dashboard', state);
	        });

  	    authEvent.onChange(({ type, data = {} }) => {
            if (type === 'login.success') {
            	this.setState({ isLoggedIn: true });
            }

            if (type === 'logout.success') {
            	this.setState({ isLoggedIn: false });
            	route('/', { ...this.state, isLoggedIn: false });
            }

        }, true);
	}

	render() {
		return (
			<div id="app">
				<Header isLoggedIn={this.state.isLoggedIn} />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Dashboard
					    path="/dashboard"
					    config={this.state.config}
					    user={this.state.user} />
				</Router>
			</div>
		);
	}
}
