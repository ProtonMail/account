import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';

import style from './style';

export default class Header extends Component {

	render({ isLoggedIn, logout }) {
		return (
			<header class={style.header}>
				<h1>Proton Account</h1>
				<nav>
				{ !isLoggedIn && <Link activeClassName={style.active} href="/">Login</Link> }
					{ isLoggedIn && <div>
						<Link activeClassName={style.active} href="/dashboard">Dashboard</Link>
						<button onclick={logout}>Logout</button>
					</div> }
				</nav>
			</header>
		);
	}
}
