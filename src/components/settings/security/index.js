import { h } from 'preact';
import TwoFactorSettings from './TwoFactor';

/**
 * Manages the setting security view.
 * @return {Component}
 */
export default function security() {
    return (
        <div>
            <h1>Security</h1>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ flex: 1 }}>
                    <TwoFactorSettings />
                </div>

                <div style={{ flex: 1 }}>
                    <h2>Session Management</h2>
                </div>
            </div>

            <div>
                <h2>Authentication Logs</h2>
            </div>
        </div>
    );
}
