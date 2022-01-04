import React from 'react';
interface IProps {
	numberOfGuesses: number;
}

const Guesses: React.FC<IProps> = ({ numberOfGuesses }) => {
	return (
		<>
			<h2>Guess: {numberOfGuesses} / 10</h2>
		</>
	);
};

export default Guesses;
