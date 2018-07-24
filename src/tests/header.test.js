import { h, Component } from 'preact';
import Header from '../components/header';
import { Link } from 'preact-router/match';
import render from 'preact-render-to-string';

describe('Initial Test of the Header', () => {
    test('Header renders 3 nav items', () => {
        const tree= render(<Header />);
        expect(tree).toMatchSnapshot();
    });
});
