import TwoFactorSettings from './TwoFactor';

import styles from './index.css';
/**
 * Manages the setting security view.
 * @return {Component}
 */
export default ({ user }) => {
    return (
        <div>
            <h1>Security</h1>
            <div className={[styles.top, styles.panel].join(' ')}>
                <div className={styles.panel}>
                    <TwoFactorSettings TwoFactor={user.TwoFactor} TOTP={user.TOTP} U2FKeys={user.U2FKeys} />
                </div>

                <div className={styles.panel}>
                    <h2>Session Management</h2>
                </div>
            </div>
            <div className={styles.panel}>
                <h2>Authentication Logs</h2>
            </div>
        </div>
    );
};
