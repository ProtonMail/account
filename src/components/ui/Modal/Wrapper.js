import styles from './index.css';

export default ({ children, onSubmit, onReset }) => (<form className={styles.wrapper} onSubmit={onSubmit} onReset={onReset}>
    {children}
</form>)
