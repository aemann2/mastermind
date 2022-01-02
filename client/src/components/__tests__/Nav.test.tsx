import { render, screen } from '@testing-library/react';
import Nav from '../Nav';
import { BrowserRouter as Router } from 'react-router-dom';

const NavComponent = (
	<Router>
		<Nav />
	</Router>
);

describe('Tests for Nav component', () => {
	test('Nav renders correctly', () => {
		render(NavComponent);
		expect(screen.getByText('Log In')).toBeInTheDocument();
		expect(screen.getByText('Instructions')).toBeInTheDocument();
	});
	test('Correct nav links are present', () => {
		render(NavComponent);
		expect(screen.getByText('Log In')).toHaveAttribute('href', '/login');
		expect(screen.getByText('Instructions')).toHaveAttribute(
			'href',
			'/instructions'
		);
	});
});
