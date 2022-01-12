import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from '../RegisterForm';

describe('Tests for RegisterForm component', () => {
	test('Component renders', () => {
		const { container } = render(<RegisterForm />);
		expect(container).not.toBeEmptyDOMElement();
	});
	test('Email input shows correct value', () => {
		render(<RegisterForm />);
		const email = screen.getByLabelText('Email');
		userEvent.type(email, 'Test');
		expect(email).toHaveValue('Test');
	});
	test('Password 1 input works', () => {
		render(<RegisterForm />);
		const password1 = screen.getByLabelText('Password');
		userEvent.type(password1, '111111');
		expect(password1).toHaveValue('111111');
	});
	test('Password 2 input works', () => {
		render(<RegisterForm />);
		const password2 = screen.getByLabelText('Confirm Password');
		userEvent.type(password2, '111111');
		expect(password2).toHaveValue('111111');
	});
	test('Register button appears', () => {
		render(<RegisterForm />);
		const submitButton = screen.getByRole('button', { name: 'Register' });
		expect(submitButton).toBeInTheDocument();
	});
});
