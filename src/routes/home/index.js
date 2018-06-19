import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/full/preact';

import style from './style';
import authActions from '../../actions/authentication';
import FormLogin from '../../components/auth/formLogin';
import FormLogin2Fa from '../../components/auth/formLogin2Fa';


export default connect(['auth'], authActions)(({ auth, loginAction, login2FAAction }) => {
  console.log('LOGIN', auth);
  return (
    <div class={style.home}>
      { auth.step === 'login' && <FormLogin login={loginAction} />}
      { auth.step === '2fa' && <FormLogin2Fa login2Fa={login2FAAction} />}
    </div>
  );
})