import ReactModal from 'react-modal';
jest.mock('react-modal');

ReactModal.setAppElement.mockImplementation((store) => store);
