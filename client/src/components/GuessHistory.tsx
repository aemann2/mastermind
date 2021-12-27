import React, { Fragment } from 'react';
import { Results } from '../types/types';
interface IProps {
	guessSequence: Results[] | [];
}

const GuessHistory: React.FC<IProps> = ({ guessSequence }) => {
	return (
		<>
			{guessSequence.length > 0 && <h2>Previous Guesses</h2>}
			{guessSequence &&
				guessSequence.map((guess, index) => (
					<Fragment key={index}>
						<p>{guess.sequence}</p>
						<p>
							N: {guess.N} L: {guess.L}
						</p>
					</Fragment>
				))}
		</>
	);
};

export default GuessHistory;
