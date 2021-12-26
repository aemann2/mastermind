import React from 'react';

interface IProps {
	guessSequence: [number] | [];
}

const GuessHistory: React.FC<IProps> = ({ guessSequence }) => {
	return (
		<>
			{guessSequence &&
				guessSequence.map((guess, index) => <h2 key={index}>{guess}</h2>)}
		</>
	);
};

export default GuessHistory;
