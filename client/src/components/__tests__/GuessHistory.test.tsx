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
	test('GuessesHistory renders single guess number correctly', () => {
		render(GuessHistorySingle);
		expect(screen.getByText('1234')).toBeInTheDocument();
	});
	test('GuessesHistory renders multiple guess numbers correctly', () => {
		render(GuessHistoryMultiple);
		expect(screen.getByText('1234')).toBeInTheDocument();
		expect(screen.getByText('5678')).toBeInTheDocument();
	});
	test('GuessesHistory renders single guess hits correctly', () => {
		render(GuessHistorySingle);
		expect(screen.getByText('N: 1 L: 2')).toBeInTheDocument();
	});
	test('GuessesHistory renders multiple guess hits correctly', () => {
		render(GuessHistoryMultiple);
		expect(screen.getByText('N: 1 L: 2')).toBeInTheDocument();
		expect(screen.getByText('N: 2 L: 0')).toBeInTheDocument();
	});
	test('GuessesHistory renders guess number and guess hits correctly', () => {
		render(GuessHistoryMultiple);
		expect(screen.getByText('1234')).toBeInTheDocument();
		expect(screen.getByText('N: 1 L: 2')).toBeInTheDocument();
		expect(screen.getByText('5678')).toBeInTheDocument();
		expect(screen.getByText('N: 2 L: 0')).toBeInTheDocument();
	});
	test('GuessesHistory renders no hits or numbers for an empty array', () => {
		const { container } = render(GuessHistoryBlank);
		expect(container).toBeEmptyDOMElement();
	});
	test('"Previous Guesses" does not appear if no guesses have been made', () => {
		render(GuessHistoryBlank);
		expect(screen.queryByText('Previous Guesses')).not.toBeInTheDocument();
	});
});
