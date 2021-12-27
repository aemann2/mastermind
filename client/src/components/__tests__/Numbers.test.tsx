import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Numbers from '../Numbers';

const setGuessNumber = jest.fn();
const setGuessSequence = jest.fn();

describe('Tests for Numbers component', () => {
	test('Component renders', () => {
		const { container } = render(
			<Numbers
				setGuessNumber={setGuessNumber}
				sequence={[1234]}
				setGuessSequence={setGuessSequence}
			/>
		);
		expect(container).not.toBeEmptyDOMElement();
	});
	test('Component shows correct number of inputs', () => {
		render(
			<Numbers
				setGuessNumber={setGuessNumber}
				sequence={[1234]}
				setGuessSequence={setGuessSequence}
			/>
		);
		const inputs = screen.getAllByRole('input');
		expect(inputs.length).toBe(4);
	});
	test('Input shows correct value when entered', () => {
		render(
			<Numbers
				setGuessNumber={setGuessNumber}
				sequence={[1234]}
				setGuessSequence={setGuessSequence}
			/>
		);
		const input = screen.getByRole('spinbutton');
		userEvent.type(input, '1');
		expect(input).toHaveValue(1);
	});
	test('Input does not show value over limit', () => {
		render(
			<Numbers
				setGuessNumber={setGuessNumber}
				sequence={[1234]}
				setGuessSequence={setGuessSequence}
			/>
		);
		const input = screen.getByRole('spinbutton');
		userEvent.type(input, '9');
		expect(input).not.toHaveValue(9);
	});
	test('Input does not show value below limit', () => {
		render(
			<Numbers
				setGuessNumber={setGuessNumber}
				sequence={[1234]}
				setGuessSequence={setGuessSequence}
			/>
		);
		const input = screen.getByRole('spinbutton');
		userEvent.type(input, '-1');
		expect(input).not.toHaveValue(-1);
	});
	test('Submit button is present', () => {
		render(
			<Numbers
				setGuessNumber={setGuessNumber}
				sequence={[1234]}
				setGuessSequence={setGuessSequence}
			/>
		);
		const submitButton = screen.getByRole('button', {
			name: 'Submit',
		});
		expect(submitButton).toBeInTheDocument();
	});
	test('Submit button clears inputs', () => {
		render(
			<Numbers
				setGuessNumber={setGuessNumber}
				sequence={[1234]}
				setGuessSequence={setGuessSequence}
			/>
		);
		const submitButton = screen.getByRole('button', {
			name: 'Submit',
		});
		const input = screen.getByRole('spinbutton');
		userEvent.type(input, '2');
		userEvent.click(submitButton);
		expect(screen.getByRole('spinbutton', { name: 'input1' })).toHaveValue('0');
	});
});
