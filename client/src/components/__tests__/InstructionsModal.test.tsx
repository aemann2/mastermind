import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InstructionsModal from '../InstructionsModal';

let open = true;

const closeModal = () => {
	open = false;
};

const testText = 'Welcome to Mastermind!';

const modalComponent = (
	<InstructionsModal
		instructionModalOpen={open}
		setInstructionModalOpen={closeModal}
	/>
);

describe('Tests for GameEndModal', () => {
	test('Modal displays text', () => {
		render(modalComponent);
		const modal = screen.getByText(testText);
		expect(modal).toBeInTheDocument();
	});
	test('Button displays for modal', () => {
		render(modalComponent);
		const button = screen.getByText('Close');
		expect(button).toBeInTheDocument();
	});
	test('Button toggles modal open state', () => {
		render(modalComponent);

		const button = screen.getByText('Close');
		userEvent.click(button);
		expect(open).toBe(false);
	});
});
