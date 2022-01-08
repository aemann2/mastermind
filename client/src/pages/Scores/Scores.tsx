import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { setAuthToken } from '../../utils/utils';

interface Score {
	_id: string;
	sequence: string;
	guesses: number;
	solved: boolean;
}

const Scores = () => {
	const [scores, setScores] = useState<Score[] | []>([]);

	// if (localStorage.token) {
	// 	setAuthToken(localStorage.token);
	// }

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
		<div>
			Scores:
			{scores.map((score) => (
				<div key={score._id}>
					<p>{score.sequence}</p>
				</div>
			))}
		</div>
	);
};

export default Scores;
