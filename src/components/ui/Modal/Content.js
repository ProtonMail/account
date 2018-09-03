import styles from './index.css';

export default (props) => <div className={[styles.content, props.className].join(' ')}>{props.children}</div>;
