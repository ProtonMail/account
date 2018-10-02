import { h } from 'preact';

import styles from './index.css';

const ModalContent = (props) => <div className={[styles.content, props.className].join(' ')}>{props.children}</div>;

export default ModalContent;
