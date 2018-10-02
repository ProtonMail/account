import { h } from 'preact';
import styles from './index.css';

const Wrapper = ({ children, onSubmit, onReset }) => (
    <form className={styles.wrapper} onSubmit={onSubmit} onReset={onReset}>
        {children}
    </form>
);

export default Wrapper;
