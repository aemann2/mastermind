import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameEndModal from '../GameEndModal';

let open = true;

const resetGame = () => {
	open = false;
};

const gameEndModalComponent = (
	<GameEndModal gameEndModalOpen={open} resetGame={resetGame}>
		Test
	</GameEndModal>
);

describe('Tests for GameEndModal', () => {
	test('Modal displays correct text', () => {
		render(gameEndModalComponent);
		const modal = screen.getByText('Test');
		expect(modal).toBeInTheDocument();
	});
	test('Button displays for modal', () => {
		render(gameEndModalComponent);
		const button = screen.getByText('Close');
		expect(button).toBeInTheDocument();
	});
	test('Button toggles modal open state', () => {
		render(gameEndModalComponent);
		const button = screen.getByText('Close');
		userEvent.click(button);
		expect(open).toBe(false);
	});
});
