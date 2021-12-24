interface IProps {
	guessNumber: number;
}

const Guesses: React.FC<IProps> = ({ guessNumber }) => {
	return (
		<>
			<h2>{guessNumber} / 10</h2>
		</>
	);
};

export default Guesses;
