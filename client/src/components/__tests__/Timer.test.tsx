import { render, screen, act } from '@testing-library/react';
import Timer from '../Timer';

jest.spyOn(global, 'setInterval');

describe('Tests for Timer component', () => {
	test('Component renders', () => {
		const { container } = render(<Timer />);
		expect(container).not.toBeEmptyDOMElement();
	});
	test('setInterval gets called when timer starts', () => {
		render(<Timer />);
		expect(setInterval).toHaveBeenCalledTimes(1);
	});
	test('Timer starts at zero', () => {
		render(<Timer />);
		const timer = screen.getByText('0:00');
		expect(timer).toBeInTheDocument();
	});
	test('Timer counts up', () => {
		jest.useFakeTimers();
		render(<Timer />);
		act(() => {
			jest.advanceTimersByTime(1000);
		});
		const timer = screen.getByText('0:01');
		expect(timer).toBeInTheDocument();
	});
});
