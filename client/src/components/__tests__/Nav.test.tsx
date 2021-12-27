import { render, screen } from '@testing-library/react';
import Nav from '../Nav';

describe('Tests for Nav component', () => {
	test('Nav renders correctly', () => {
		render(<Nav />);
		expect(screen.getByText('Sign In')).toBeInTheDocument();
		expect(screen.getByText('High Scores')).toBeInTheDocument();
	});
	test('Correct nav links are present', () => {
		render(<Nav />);
		expect(screen.getByRole('link')).toHaveAttribute(
			'href',
			'https://www.test.com'
		);
		expect(screen.getByRole('link')).toHaveAttribute(
			'href',
			'https://www.test.com'
		);
	});
});
