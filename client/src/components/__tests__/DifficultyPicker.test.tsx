import { render, screen } from '@testing-library/react';
import DifficultyPicker from '../DifficultyPicker';

const setNumberOfInputs = jest.fn();

describe('Tests for difficulty picker', () => {
	it('Renders all buttons', () => {
		render(<DifficultyPicker setNumberOfInputs={setNumberOfInputs} />);
		const buttons = screen.getAllByRole('button');
		expect(buttons).toHaveLength(3);
	});
});
