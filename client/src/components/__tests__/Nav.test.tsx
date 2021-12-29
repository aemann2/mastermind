import { render, screen } from '@testing-library/react';
import Nav from '../Nav';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Tests for Nav component', () => {
	test('Nav renders correctly', () => {
		render(
			<Router>
				<Nav />
			</Router>
		);
		expect(screen.getByText('Log In')).toBeInTheDocument();
		expect(screen.getByText('Instructions')).toBeInTheDocument();
	});
	test('Correct nav links are present', () => {
		render(
			<Router>
				<Nav />
			</Router>
		);
		expect(screen.getByText('Log In').closest('a')).toHaveAttribute(
			'href',
			'/login'
		);
		expect(screen.getByText('Instructions').closest('a')).toHaveAttribute(
			'href',
			'/instructions'
		);
	});
});
