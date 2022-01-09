import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/pages/Scores.module.scss';
import Nav from '../components/Nav';

interface Score {
	_id: string;
	sequence: string;
	guesses: number;
	solved: boolean;
}

const Scores = () => {
	const [scores, setScores] = useState<Score[] | []>([]);

	useEffect(() => {
		getScores();
	}, []);

	async function getScores() {
		const res = await axios.get(
			'https://mastermind-amann.herokuapp.com/api/scores'
		);
		setScores(res.data.data);
	}

	return (
		<>
			<Nav />
			<div className={styles.scoresWrapper}>
				<h2>Your Score History</h2>
				{scores && (
					<div className={styles.scores}>
						{scores.map((score, index) => {
							const { guesses, sequence, solved } = score;

							return (
								<div className={styles.score} key={score._id}>
									<p className={styles.bold}>
										{Math.abs(index - scores.length)}.
									</p>
									<p>
										<span className={styles.bold}>Sequence:</span> {sequence}
									</p>
									<p>
										<span className={styles.bold}>Guesses:</span> {guesses}
									</p>
									<p>
										<span className={styles.bold}>Solved:</span>{' '}
										{solved ? 'Yes' : 'No'}
									</p>
									{index === scores.length - 1 ? null : <hr />}
								</div>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
};

export default Scores;
