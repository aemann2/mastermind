import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import Modal from '../../ui/Modal';

const TestModal: React.FC = () => {
	const [isOpen, setIsOpen] = useState(true);
	const mockIsOpen = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={mockIsOpen}>
			This is a test
			<button onClick={mockIsOpen}>Close</button>
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
	test('Button closes modal', () => {
		render(<TestModal />);
		const button = screen.getByText('Close');
		userEvent.click(button);
		expect(screen.queryByText('This is a test')).not.toBeInTheDocument();
	});
});
