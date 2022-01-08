import { Results } from '../types/types';
import styles from '../styles/GuessHistory.module.scss';
interface IProps {
	guessSequence: Results[] | [];
}

const GuessHistory: React.FC<IProps> = ({ guessSequence }) => {
	const guessSequenceReversed = [...guessSequence].reverse();

	return (
		<section className={styles.guessHistory}>
			{guessSequence.length > 0 && <h3>Previous Guesses</h3>}
			<div className={styles.guessHistoryWrapper}>
				<ol>
					{guessSequence &&
						guessSequenceReversed.map((guess, index) => (
							<li
								className={styles.guessItem}
								data-testid='guessItem'
								key={index}
							>
								<div>
									<span>{Math.abs(index - guessSequence.length)}. </span>
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
							</li>
						))}
				</ol>
			</div>
		</section>
	);
};

export default GuessHistory;
