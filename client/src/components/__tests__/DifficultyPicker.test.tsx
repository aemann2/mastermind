import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DifficultyPicker from '../DifficultyPicker';

describe('Tests for difficulty picker', () => {
	it('Renders all buttons', () => {
		render(<DifficultyPicker />);
		const buttons = screen.getAllByRole('button');
		expect(buttons).toHaveLength(3);
	});
});
