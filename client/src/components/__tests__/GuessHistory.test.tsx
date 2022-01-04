import { render, screen } from '@testing-library/react';
import GuessHistory from '../GuessHistory';

const GuessHistorySingle = (
	<GuessHistory guessSequence={[{ guessSequence: [1234], N: 1, L: 2 }]} />
);

const GuessHistoryMultiple = (
	<GuessHistory
		guessSequence={[
			{ guessSequence: [1234], N: 1, L: 2 },
			{ guessSequence: [5678], N: 2, L: 0 },
		]}
	/>
);

const GuessHistoryBlank = <GuessHistory guessSequence={[]} />;

describe('GuessHistory component tests', () => {
	test('GuessesHistory renders single guess hits correctly', () => {
		render(GuessHistorySingle);
		const text = screen.getByTestId('guess');
		expect(text.textContent).toBe('1234 N: 1 L: 2');
	});
	test('GuessesHistory renders guess number and guess hits correctly', () => {
		render(GuessHistoryMultiple);
		const text = screen.getAllByTestId('guess');
		expect(text[0].textContent).toBe('1234 N: 1 L: 2');
		expect(text[1].textContent).toBe('5678 N: 2 L: 0');
	});

	test('"Previous Guesses" does not appear if no guesses have been made', () => {
		render(GuessHistoryBlank);
		expect(screen.queryByText('Previous Guesses')).not.toBeInTheDocument();
	});
});
