import { h } from 'preact';
import { connect } from 'unistore/full/preact';
import TextButton from '../../components/ui/TextButton';
import { info } from '../../helpers/notification';

export default connect(['auth', 'config'])(({ auth, config }) => {
    console.log('DASHBOARD', auth)
  return (<div id="dashboard" style="margin-top: 100px">
        <h1>Bonjour <b>{auth.user.Name}</b></h1>

      <TextButton onClick={() => {
          const id = Math.floor(Math.random() * 100) + 1;
          info('Test notification ' + id, { id });
      }}>Send a test notification</TextButton>

        <pre>
            {JSON.stringify(config, null, 2)}
        </pre>
  </div>);
})
