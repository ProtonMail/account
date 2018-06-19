import { h } from 'preact';
import { connect } from 'unistore/full/preact';

export default connect(['auth', 'config'])(({ auth, config }) => {
    console.log('DASHBOARD', auth)
  return (<div id="dashboard" style="margin-top: 100px">
        <h1>Bonjour <b>{auth.user.Name}</b></h1>

        <pre>
            {JSON.stringify(config, null, 2)}
        </pre>
  </div>);
})
