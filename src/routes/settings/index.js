import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { connect } from 'unistore/full/preact';

import Security from '../../components/settings/security';

import styles from './index.css';

/**
 * Renders the content of the selected setting (using the URI).
 * @param {String} setting - the route of the setting to render
 * @param {Object} user
 * @returns {Component}
 */
function renderContent(setting, user) {
    if (setting === 'security') {
        return (<Security user={user}/>);
    }
    return (<h1>
        Paramètres pour <b>{user.Username}</b>
    </h1>);
}

export default connect(['auth', 'config'])(({ side, config }) => {
    if (!config) {
        return null;
    }
    const { settings: { user } } = config;
    console.log('SETTINGS', user);
    if (!Object.keys(user).length) return null;
    return (
        <div className={styles.security}>
            <div className={styles.nav}>
                <ul>
                    <li>
                        <Link activeClassName={styles.selected} href="/settings"> Home </Link>
                    </li>
                    <li>
                        <Link activeClassName={styles.selected} href="/settings/security"> Security </Link>
                    </li>
                </ul>
            </div>
            <div id="settings" className={styles.content}>
                {renderContent(side, user)}
            </div>
        </div>
    );
});
