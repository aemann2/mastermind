import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('Integration tests for Numbers and Guesses', () => {
	test('Guesses renders correct number after submit button is clicked', () => {
		render(<App />);
		const submitButton = screen.getByRole('button', {
			name: 'Submit',
		});
		userEvent.click(submitButton);
		expect(screen.getByText('1 / 10')).toBeInTheDocument();
	});
});

describe('Integration tests for Numbers and Modal', () => {
	test('A correct guess displays a modal with a message', () => {
		render(<App />);
		const submitButton = screen.getByRole('button', {
			name: 'Submit',
		});
		userEvent.click(submitButton);
		const modal = screen.getByRole('dialog');
		expect(modal).toBeInTheDocument();
		expect(screen.getByText('Correct!')).toBeInTheDocument();
	});
	test("A user's final guess displays a modal with a message", () => {
		render(<App />);
		const submitButton = screen.getByRole('button', {
			name: 'Submit',
		});
		for (let i = 0; i < 10; i++) {
			userEvent.click(submitButton);
		}
		const modal = screen.getByRole('dialog');
		expect(modal).toBeInTheDocument();
		expect(screen.getByText('Nice try!')).toBeInTheDocument();
	});
});

describe('Integration tests for Guesses, GuessHistory, and Modal', () => {
	test('Closing gameloop modal resets Guess and GuessHistory', () => {
		render(<App />);
		const submitButton = screen.getByRole('button', {
			name: 'Submit',
		});
		for (let i = 0; i < 10; i++) {
			userEvent.click(submitButton);
		}
		const modal = screen.getByRole('dialog');
		const closeButton = screen.getByRole('button', {
			name: 'Close',
		});
		userEvent.click(closeButton);
		expect(modal).not.toBeInTheDocument();
		expect(screen.getByText('0 / 10')).toBeInTheDocument();
		expect(screen.queryByText('Previous Guesses')).not.toBeInTheDocument();
	});
});
