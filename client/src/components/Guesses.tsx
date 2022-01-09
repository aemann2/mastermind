import React from 'react';
import styles from '../styles/Guesses.module.scss';
interface IProps {
	numberOfGuesses: number;
}

const Guesses: React.FC<IProps> = ({ numberOfGuesses }) => {
	return (
		<>
			<h2 className={styles.guesses}>Guess: {numberOfGuesses} / 10</h2>
		</>
	);
};

export default Guesses;
