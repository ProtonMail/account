import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';
import { isLoggedIn as isAuthenticated } from 'frontend-commons/src/user/model';

import style from './style';
import { logout } from '../../actions/auth';

export default class Header extends Component {

	async logout() {
	    const state = await logout(this.state);
	    this.setState(state);
	    route('signup', state);
	}

	render({ isLoggedIn }) {
		return (
			<header class={style.header}>
				<h1>Proton Account</h1>
				<nav>
					<Link activeClassName={style.active} href="/">Login</Link>
					<Link activeClassName={style.active} href="/dashboard">Dashboard</Link>
					{ (isLoggedIn || isAuthenticated()) && <button onclick={ e => this.logout()}>Logout</button> }
				</nav>
			</header>
		);
	}
}
