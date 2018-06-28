import styles from './index.css';

export default (props) => (<div class={[ styles.content, props.class ].join(' ')}>
    {props.children}
</div>);
