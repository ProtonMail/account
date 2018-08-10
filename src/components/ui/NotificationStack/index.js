import { Component } from 'preact';

import { onInput } from '../../../helpers/notification';

import styles from './index.css';

const EXPIRATION_TIME = 5000;
const MAX_STACK_SIZE = 5;

/**
 * Displays all the current notifications.
 */
export default class NotificationStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stack: [],
            popping: false
        };
        onInput(notification => {
            const removed = this.state.stack[MAX_STACK_SIZE - 1];
            const newNotification = {
                notification,
                timeoutId: this.popNotification()
            };
            this.setState({
                stack: [newNotification, ...this.state.stack.slice(0, MAX_STACK_SIZE - 1)]
            });
            if (removed) {
                clearTimeout(removed.timeoutId);
            }
        });
    }

    /**
     * Deletes the associated notification.
     * @return {number} the setTimeout id.
     */
    popNotification() {
        const id = setTimeout(() => {
            const stack = this.state.stack.filter(({ timeoutId }) => timeoutId !== id);
            this.setState({ stack });
            clearTimeout(id);
        }, EXPIRATION_TIME);
        return id;
    }

    render() {

        const notifications = this.state.stack;
        if (notifications && notifications.length) {
            return (<ul className={styles.notificationStack}>
                {notifications.map(NotificationStack.renderNotification)}
            </ul>);

        }
        return null;
    }

    static renderNotification({ notification: { type, data: { message, opt } } }) {
        const classes = [styles.notification];
        if (styles[type]) {
            classes.push(styles[type]);
        }
        return (<li className={classes.join(' ')}>
            <p>{message}</p>
        </li>);
    }
}

