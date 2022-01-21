import { render, screen } from '@testing-library/react';
import DifficultyPicker from '../DifficultyPicker';

describe('Tests for difficulty picker', () => {
	it('Renders all buttons', () => {
		render(<DifficultyPicker />);
		const buttons = screen.getAllByRole('button');
		expect(buttons).toHaveLength(3);
	});
});
