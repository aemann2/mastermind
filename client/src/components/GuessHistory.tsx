import React, { Fragment } from 'react';

interface results {
	sequence: number;
	N: number;
	L: number;
}
interface IProps {
	guessSequence: results[] | [];
}

const GuessHistory: React.FC<IProps> = ({ guessSequence }) => {
	return (
		<>
			{guessSequence &&
				guessSequence.map((guess, index) => (
					<Fragment key={index}>
						<h2>{guess.sequence}</h2>
						<h2>
							N: {guess.N} L: {guess.L}
						</h2>
					</Fragment>
				))}
		</>
	);
};

export default GuessHistory;
