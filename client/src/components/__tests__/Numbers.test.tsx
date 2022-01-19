import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Numbers from '../Numbers';

const setNumberOfGuesses = jest.fn();
const setGuessSequence = jest.fn();
const setWin = jest.fn();
const setModalOpen = jest.fn();
const setRoundStarted = jest.fn();

const NumbersComponent = (
	<Numbers
		numberOfGuesses={0}
		gameEndModalOpen={false}
		setWin={setWin}
		setGameEndModalOpen={setModalOpen}
		setNumberOfGuesses={setNumberOfGuesses}
		sequence={[1234]}
		setGuessSequence={setGuessSequence}
		roundStarted={true}
		setRoundStarted={setRoundStarted}
	></Numbers>
);

describe('Tests for Numbers component', () => {
	test('Component renders', () => {
		const { container } = render(NumbersComponent);
		expect(container).not.toBeEmptyDOMElement();
	});
	test('Component shows correct number of inputs', () => {
		render(NumbersComponent);
		const inputs = screen.getAllByDisplayValue(0);
		expect(inputs.length).toBe(4);
	});
	test('Inputs shows correct values when entered', () => {
		render(NumbersComponent);
		const inputs = screen.getAllByDisplayValue(0);
		userEvent.type(inputs[0], '1');
		expect(inputs[0]).toHaveValue('1');
		userEvent.type(inputs[1], '2');
		expect(inputs[1]).toHaveValue('2');
		userEvent.type(inputs[2], '3');
		expect(inputs[2]).toHaveValue('3');
		userEvent.type(inputs[3], '4');
		expect(inputs[3]).toHaveValue('4');
	});
	test('Input does not show value over limit', () => {
		render(NumbersComponent);
		const inputs = screen.getAllByDisplayValue(0);
		userEvent.type(inputs[0], '9');
		expect(inputs[0]).not.toHaveValue(9);
	});
	test('Input does not show value below limit', () => {
		render(NumbersComponent);
		const inputs = screen.getAllByDisplayValue(0);
		userEvent.type(inputs[0], '-1');
		expect(inputs[0]).not.toHaveValue(-1);
	});
	test('Submit button is present', () => {
		render(NumbersComponent);
		const submitButton = screen.getByRole('button', {
			name: 'Submit',
		});
		expect(submitButton).toBeInTheDocument();
	});
	test('Submit button does not clear inputs', () => {
		render(NumbersComponent);
		const submitButton = screen.getByRole('button', {
			name: 'Submit',
		});
		const inputs = screen.getAllByDisplayValue(0);
		userEvent.type(inputs[0], '2');
		userEvent.click(submitButton);
		expect(inputs[0]).toHaveValue('2');
	});
});
