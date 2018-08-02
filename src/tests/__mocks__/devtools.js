import devtools from 'unistore/devtools';

jest.mock('unistore/devtools');
devtools.mockImplementation((store) => store);
