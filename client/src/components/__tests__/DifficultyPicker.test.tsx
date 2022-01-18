import { render, screen } from '@testing-library/react';
import DifficultyPicker from '../DifficultyPicker';

const setNumberOfInputs = jest.fn();

describe('Difficulty Picker component tests', () => {
	test('Picker renders correct buttons', () => {
		render(<DifficultyPicker setNumberOfInputs={setNumberOfInputs} />);
		expect(screen.getByText('Easy')).toBeInTheDocument();
		expect(screen.getByText('Medium')).toBeInTheDocument();
		expect(screen.getByText('Hard')).toBeInTheDocument();
	});
});
