import { render, screen, act } from '@testing-library/react';
import Timer from '../Timer';

jest.spyOn(global, 'setInterval');
const setElapsedTime = jest.fn();

const TimerComponent = <Timer setElapsedTime={setElapsedTime} />;

describe('Tests for Timer component', () => {
	test('Component renders', () => {
		const { container } = render(TimerComponent);
		expect(container).not.toBeEmptyDOMElement();
	});
	test('setInterval gets called when timer starts', () => {
		render(TimerComponent);
		expect(setInterval).toHaveBeenCalledTimes(1);
	});
	test('Timer starts at zero', () => {
		render(TimerComponent);
		const timer = screen.getByText('0:00');
		expect(timer).toBeInTheDocument();
	});
	test('Timer counts up', () => {
		jest.useFakeTimers();
		render(TimerComponent);
		act(() => {
			jest.advanceTimersByTime(1000);
		});
		const timer = screen.getByText('0:01');
		expect(timer).toBeInTheDocument();
	});
});
