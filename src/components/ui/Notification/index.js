import { Component } from 'preact';
import styles from './index.css';
import { onInput } from '../../../lib/notification';

/**
 * Creates a new modal, using a predefined style.
 * @param {boolean} isOpen - Whether the modal is open or not.
 * @param {title} title - Title of the modal.
 * @param {Component} children
 * @param {Function} onRequestClose - called after the modal is closed.
 * @param {Function} onAfterOpen - called after the modal is opened.
 * @param {String} [contentLabel=null]- the content label. If not given, title is used.
 * @return {ReactModal} the modal component.
 */
export default class extends Component {


    constructor(props) {
        super(props);
        this.state = {
            stack: [],
            popping: false
        };
        onInput(notification => {
            console.debug('onInput', this.state.stack);
            this.setState({
                stack: [...this.state.stack, notification],
                popping: true
            });
            this.popNotification();
        });
    }

    popNotification() {
        if (!this.state.popping || !this.state.stack.length) {
            this.setState({ popping: false });
            return;
        }
        setTimeout(() => {
            const [current, ...newStack] = this.state.stack;
            this.setState({ stack: newStack });
            this.popNotification();
        }, 5000);
    }


    render() {
        console.debug('render');
        const classes = [styles.notification];
        let content = '';

        const [currentNotification] = this.state.stack;
        if (currentNotification) {
            const { type, data: { message, opt } } = currentNotification;
            classes.push(styles[type]);
            content = message;
            return (<div
                class={classes.join(' ')}
            >
                <h3>{content}</h3>
            </div>);

        }
        return null;
    }
}

