import { useState, useEffect } from 'react';

const Timer = () => {
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	useEffect(() => {
		let myInterval = setInterval(() => {
			setSeconds(seconds + 1);
			if (seconds === 59) {
				setMinutes(minutes + 1);
				setSeconds(0);
			}
		}, 1000);
		return () => {
			clearInterval(myInterval);
		};
	});

	return (
		<>
			<h1>
				{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
			</h1>
		</>
	);
};

export default Timer;
