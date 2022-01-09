import { render, screen } from '@testing-library/react';
import Button from '../../ui/Modal';

const TestButton: React.FC = () => {
	return <Button>This is a test</Button>;
};

describe('Button component tests', () => {
	test('Button renders correct text from children', () => {
		render(<TestButton />);
		expect(screen.getByText('This is a test')).toBeInTheDocument();
	});
});
