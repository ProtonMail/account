import { isSupported } from 'u2f-api';

jest.mock('u2f-api');
isSupported.mockImplementation(() => true);
