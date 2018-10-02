import { h } from 'preact';

const Link = ({ href, children }) => (
    <a className="a" href={href} target="_blank" rel="noopener noreferrer">
        {children}
    </a>
);

export default Link;
