import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../LoginForm';

describe('Tests for RegisterForm component', () => {
	test('Component renders', () => {
		const { container } = render(<LoginForm />);
		expect(container).not.toBeEmptyDOMElement();
	});
	test('Email input shows correct value', () => {
		render(<LoginForm />);
		const email = screen.getByLabelText('Email');
		userEvent.type(email, 'Test');
		expect(email).toHaveValue('Test');
	});
	test('Password 1 input works', () => {
		render(<LoginForm />);
		const password1 = screen.getByLabelText('Password');
		userEvent.type(password1, '111111');
	});
	test('Login button appears', () => {
		render(<LoginForm />);
		const submitButton = screen.getByRole('button', { name: 'Log In' });
		expect(submitButton).toBeInTheDocument();
	});
});
