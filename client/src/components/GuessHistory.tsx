import { Results } from '../types/types';
import styles from '../styles/GuessHistory.module.scss';
interface IProps {
	guessSequence: Results[] | [];
}

const GuessHistory: React.FC<IProps> = ({ guessSequence }) => {
	return (
		<div className={styles.guessHistory}>
			{guessSequence.length > 0 && <h2>Previous Guesses</h2>}
			{guessSequence &&
				guessSequence.map((guess, index) => (
					<div data-testid='guess' key={index}>
						<span>{guess.guessSequence} </span>
						<span>
							<span>N: </span>
							<span>{guess.N}</span>
							<span> L: </span>
							<span>{guess.L}</span>
						</span>
					</div>
				))}
		</div>
	);
};

export default GuessHistory;
