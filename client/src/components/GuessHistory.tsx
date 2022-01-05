import { Results } from '../types/types';
import styles from '../styles/GuessHistory.module.scss';
interface IProps {
	guessSequence: Results[] | [];
}

const GuessHistory: React.FC<IProps> = ({ guessSequence }) => {
	return (
		<div className={styles.guessHistory}>
			{guessSequence.length > 0 && <h3>Previous Guesses:</h3>}
			<div className={styles.guessHistoryWrapper}>
				{guessSequence &&
					guessSequence.map((guess, index) => (
						<div
							className={styles.guessItem}
							data-testid='guessItem'
							key={index}
						>
							<div>
								<span>{guess.guessSequence} </span>
							</div>
							<div>
								<span>
									<span className={styles.guessStat}>N: </span>
									<span>{guess.N}</span>
									<span className={styles.guessStat}> L: </span>
									<span>{guess.L}</span>
								</span>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default GuessHistory;
