import { render, screen } from '@testing-library/react';
import Guesses from '../Guesses';

describe('Guesses component tests', () => {
	test('Guesses renders correct number', () => {
		render(<Guesses numberOfGuesses={5} />);
		expect(screen.getByText('5 / 10')).toBeInTheDocument();
	});
	test('Guesses renders zero', () => {
		render(<Guesses numberOfGuesses={0} />);
		expect(screen.getByText('0 / 10')).toBeInTheDocument();
	});
});
