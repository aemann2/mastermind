import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Guesses from '../Guesses';
// import GuessHistory from '../GuessHistory';
// import Numbers from '../Numbers';
import App from '../../App';

const setGuessNumber = jest.fn();
const setGuessSequence = jest.fn();

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

// a guess displays a modal with a message
// a correct guess displays a modal with a message
// a user's final guess displays a modal with a message
// closing the final guess starts guess count over
