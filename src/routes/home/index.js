import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/full/preact';

import style from './style';
import authActions from '../../actions/authentication';
import FormLogin from '../../components/auth/formLogin';
import FormLogin2FA from '../../components/auth/formLogin2FA';

export default connect(['auth'], authActions)(({ auth, loginAction, login2FAAction }) => {
  console.log('LOGIN', auth);
  return (
    <div class={style.home}>
      { auth.step === 'login' && <FormLogin login={loginAction} />}
        {auth.step === '2fa' && <FormLogin2FA login2FA={login2FAAction} twoFactorData={auth.twoFactorData}/>}
    </div>
  );
})
