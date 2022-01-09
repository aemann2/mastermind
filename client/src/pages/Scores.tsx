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
			Your Score History:
			{scores && (
				<div>
					{scores.map((score) => {
						const { guesses, sequence, solved } = score;

						return (
							<div key={score._id}>
								<p>Sequence: {sequence}</p>
								<p>Guesses: {guesses}</p>
								<p>Solved: {solved ? 'Yes' : 'No'}</p>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Scores;
