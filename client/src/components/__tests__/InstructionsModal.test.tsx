import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InstructionsModal from '../InstructionsModal';

let open = true;

const closeModal = () => {
	open = false;
};

describe('Tests for GameEndModal', () => {
	test('Modal displays correct text', () => {
		render(
			<InstructionsModal
				instructionModalOpen={open}
				setInstructionModalOpen={closeModal}
			>
				Test
			</InstructionsModal>
		);
		const modal = screen.getByText('Test');
		expect(modal).toBeInTheDocument();
	});
	test('Button displays for modal', () => {
		render(
			<InstructionsModal
				instructionModalOpen={open}
				setInstructionModalOpen={closeModal}
			>
				Test
			</InstructionsModal>
		);
		const button = screen.getByText('Close');
		expect(button).toBeInTheDocument();
	});
	test('Button toggles modal open state', () => {
		render(
			<InstructionsModal
				instructionModalOpen={open}
				setInstructionModalOpen={closeModal}
			>
				Test
			</InstructionsModal>
		);

		const button = screen.getByText('Close');
		userEvent.click(button);
		expect(open).toBe(false);
	});
});
