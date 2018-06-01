import { h, Component } from 'preact';
import { route } from 'preact-router';

import style from './style';
import { login, login2FA } from '../../actions/auth';
import FormLogin from '../../components/auth/formLogin';
import FormLogin2Fa from '../../components/auth/formLogin2Fa';

export default class Home extends Component {

  componentWillMount() {
      this.setState({ step: 'login', isLoggedIn: false });
  }

  async login(model) {
    try {
      const newState = await login(model, this.state);
      this.setState(newState);
      newState.isLoggedIn && route('dashboard', newState);
    } catch (e) {
      console.error(e);
    }
  }

  async login2Fa(model) {
    try {
      const newState = await login2FA(model, this.state);
      this.setState(newState);
      newState.isLoggedIn && route('dashboard', newState);
    } catch (e) {
      console.error(e);
    }
  }

	render() {
		return (
			<div class={style.home}>
        { this.state.step === 'login' && <FormLogin login={(data) => this.login(data)} />}
				{ this.state.step === '2fa' && <FormLogin2Fa login2Fa={(data) => this.login2Fa(data)} />}
			</div>
		);
	}
}
