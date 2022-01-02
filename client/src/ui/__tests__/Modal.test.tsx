import { render, screen } from '@testing-library/react';
import Modal from '../../ui/Modal';

const TestModal: React.FC = () => {
	return (
		<Modal>
			This is a test
			<button>Close</button>
		</Modal>
	);
};

describe('Modal component tests', () => {
	test('Modal renders correct message from children', () => {
		render(<TestModal />);
		expect(screen.getByText('This is a test')).toBeInTheDocument();
	});
	test('Modal renders button from children', () => {
		render(<TestModal />);
		const button = screen.getByText('Close');
		expect(button).toBeInTheDocument();
	});
});
