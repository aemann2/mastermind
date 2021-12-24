interface IProps {
	guess: number;
}

const Guesses: React.FC<IProps> = ({ guess }) => {
	return (
		<>
			<h2>{guess} / 10</h2>
		</>
	);
};

export default Guesses;
