import { extended } from '../../helpers/stateFormatter';

const state = {
    a: {
        c: {
            e: 1,
            g: 'arabica'
        }
    },
    b: {
        d: {
            f: 2
        },
        h: 256
    }
};

describe('"extended" tests for stateFormatter', () => {
    test('only includes root element', () => {
        expect(extended(state, 'a', { d: 1 })).toMatchSnapshot();
    });
    test('includes all non root element', () => {
        expect(extended(state, 'b', { h: 256 })).toMatchSnapshot();
    });
    test('correctly updates element', () => {
        expect(extended(state, 'b.d', { f: -1 })).toMatchSnapshot();
    });
    test('correctly behave when array is given', () => {
        expect(extended(state, ['b.d', 'f'], { n: -1 })).toMatchSnapshot();
    });
});
