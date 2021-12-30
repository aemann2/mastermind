import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameEndModal from '../GameEndModal';

let open = true;

const resetGame = () => {
	open = false;
};

describe('Tests for GameEndModal', () => {
	test('Modal displays correct text', () => {
		render(
			<GameEndModal gameEndModalOpen={open} resetGame={resetGame}>
				Test
			</GameEndModal>
		);
		const modal = screen.getByText('Test');
		expect(modal).toBeInTheDocument();
	});
	test('Button displays for modal', () => {
		render(
			<GameEndModal gameEndModalOpen={open} resetGame={resetGame}>
				Test
			</GameEndModal>
		);
		const button = screen.getByText('Close');
		expect(button).toBeInTheDocument();
	});
	test('Button toggles modal open state', () => {
		render(
			<GameEndModal gameEndModalOpen={open} resetGame={resetGame}>
				Test
			</GameEndModal>
		);

		const button = screen.getByText('Close');
		userEvent.click(button);
		expect(open).toBe(false);
	});
});
