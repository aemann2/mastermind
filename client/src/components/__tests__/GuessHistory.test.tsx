import { render, screen } from '@testing-library/react';
import GuessHistory from '../GuessHistory';

describe('GuessHistory component tests', () => {
	test('GuessesHistory renders single guess number correctly', () => {
		render(<GuessHistory guessSequence={[{ sequence: 1234, N: 1, L: 2 }]} />);
		expect(screen.getByText('1234')).toBeInTheDocument();
	});
	test('GuessesHistory renders multiple guess numbers correctly', () => {
		render(
			<GuessHistory
				guessSequence={[
					{ sequence: 1234, N: 1, L: 2 },
					{ sequence: 5678, N: 2, L: 0 },
				]}
			/>
		);
		expect(screen.getByText('1234')).toBeInTheDocument();
		expect(screen.getByText('5678')).toBeInTheDocument();
	});
	test('GuessesHistory renders single guess hits correctly', () => {
		render(<GuessHistory guessSequence={[{ sequence: 1234, N: 1, L: 2 }]} />);
		expect(screen.getByText('N: 1 L: 2')).toBeInTheDocument();
	});
	test('GuessesHistory renders multiple guess hits correctly', () => {
		render(
			<GuessHistory
				guessSequence={[
					{ sequence: 1234, N: 1, L: 2 },
					{ sequence: 5678, N: 2, L: 0 },
				]}
			/>
		);
		expect(screen.getByText('N: 1 L: 2')).toBeInTheDocument();
		expect(screen.getByText('N: 2 L: 0')).toBeInTheDocument();
	});
	test('GuessesHistory renders guess number and guess hits correctly', () => {
		render(
			<GuessHistory
				guessSequence={[
					{ sequence: 1234, N: 1, L: 2 },
					{ sequence: 5678, N: 2, L: 0 },
				]}
			/>
		);
		expect(screen.getByText('1234')).toBeInTheDocument();
		expect(screen.getByText('N: 1 L: 2')).toBeInTheDocument();
		expect(screen.getByText('5678')).toBeInTheDocument();
		expect(screen.getByText('N: 2 L: 0')).toBeInTheDocument();
	});
	test('GuessesHistory renders no hits or numbers for an empty array', () => {
		const { container } = render(<GuessHistory guessSequence={[]} />);
		expect(container).toBeEmptyDOMElement();
	});
	test('"Previous Guesses" does not appear if no guesses have been made', () => {
		render(<GuessHistory guessSequence={[]} />);
		expect(screen.queryByText('Previous Guesses')).not.toBeInTheDocument();
	});
});
