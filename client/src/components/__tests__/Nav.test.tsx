import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Nav from '../Nav';
import { BrowserRouter as Router } from 'react-router-dom';

const setInstructionModalOpen = jest.fn();

const NavComponent = (
	<Router>
		<Nav setInstructionModalOpen={setInstructionModalOpen} />
	</Router>
);

describe('Tests for Nav component', () => {
	test('Placeholder test', () => {});
	test('Nav renders correctly', () => {
		render(NavComponent);
		expect(screen.getByText('Log In')).toBeInTheDocument();
		expect(screen.getByText('Rules')).toBeInTheDocument();
	});
	test('Correct nav links are present', () => {
		render(NavComponent);
		expect(screen.getByText('Log In')).toHaveAttribute('href', '/login');
		expect(screen.getByText('Register')).toHaveAttribute('href', '/register');
	});
	test('Rules link not present on logged in page', () => {
		render(NavComponent);
		const loginButton = screen.getByText('Log In');
		userEvent.click(loginButton);
		expect(screen.queryByText('Rules')).not.toBeInTheDocument();
	});
	test('Rules link not present on register page', () => {
		render(NavComponent);
		const registerButton = screen.getByText('Register');
		userEvent.click(registerButton);
		expect(screen.queryByText('Rules')).not.toBeInTheDocument();
	});
	test('Scores link not present when not logged in', () => {
		render(NavComponent);
		const scoresLink = screen.queryByText('Scores');
		expect(scoresLink).not.toBeInTheDocument();
	});
});
