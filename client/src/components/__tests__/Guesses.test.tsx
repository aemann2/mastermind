import { render, screen } from '@testing-library/react';
import Guesses from '../Guesses';

describe('Guesses component tests', () => {
	test('Guesses renders correct number', () => {
		render(<Guesses guessNumber={5} />);
		expect(screen.getByText('5 / 10')).toBeInTheDocument();
	});
});
