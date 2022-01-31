import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/pages/Scores.module.scss';
import Nav from '../components/Nav';

interface Score {
	_id: string;
	sequence: string;
	difficulty: string;
	guesses: number;
	time: string;
	solved: boolean;
}

const Scores = () => {
	const [scores, setScores] = useState<Score[] | null>(null);

	useEffect(() => {
		getScores();
	}, []);

	async function getScores() {
		const res = await axios.get('/api/scores');
		setScores(res.data.data);
	}

	return (
		<>
			<Nav />
			{scores ? (
				<div className={styles.scoresWrapper}>
					<h2>Your Score History</h2>
					{scores && (
						<div className={styles.scores}>
							{scores.length > 0 ? (
								scores.map((score, index) => {
									const { guesses, difficulty, sequence, time, solved } = score;

									return (
										<div className={styles.score} key={score._id}>
											<p className={styles.bold}>
												{Math.abs(index - scores.length)}.
											</p>
											<p>
												<span className={styles.bold}>Sequence: </span>
												{sequence}
											</p>
											<p>
												<span className={styles.bold}>Difficulty: </span>
												{difficulty}
											</p>
											<p>
												<span className={styles.bold}>Time:</span> {time}
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
								})
							) : (
								<p className={styles.noGames}>
									You haven't played any games yet!
								</p>
							)}
						</div>
					)}
				</div>
			) : (
				<div className={styles.scoresWrapper}>
					<h4 className={styles.loading}>Loading...</h4>
				</div>
			)}
		</>
	);
};

export default Scores;
