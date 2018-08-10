import render from 'preact-render-to-string';

import Header from '../components/header';

describe('Initial Test of the Header', () => {
    test('Header renders 3 nav items', () => {
        const tree= render(<Header />);
        expect(tree).toMatchSnapshot();
    });
});
