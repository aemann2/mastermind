import { useState, useEffect } from 'react';

type elapsedTime = {
	mins: number;
	secs: number;
};
interface IProps {
	roundStarted: boolean;
	gameEndModalOpen: boolean;
	setElapsedTime: React.Dispatch<React.SetStateAction<elapsedTime>>;
}

const Timer: React.FC<IProps> = ({
	roundStarted,
	gameEndModalOpen,
	setElapsedTime,
}) => {
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	useEffect(() => {
		if (roundStarted) {
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
		}
	}, [roundStarted, minutes, seconds]);

	useEffect(() => {
		setElapsedTime({ mins: minutes, secs: seconds });
	}, [minutes, seconds, setElapsedTime]);

	useEffect(() => {
		if (!gameEndModalOpen) {
			setMinutes(0);
			setSeconds(0);
		}
	}, [gameEndModalOpen]);

	return (
		<>
			<h1>
				{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
			</h1>
		</>
	);
};

export default Timer;
