import { useState } from 'react';
import axios from 'axios';
import Guesses from './components/Guesses';
import Numbers from './components/Numbers';
import GuessHistory from './components/GuessHistory';

function App() {
	const [sequence, setSequence] = useState<[number] | null>(null);
	const [guessNumber, setGuessNumber] = useState<number>(0);

	const getSequence = async () => {
		const num = await axios(
			'https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new'
		);
		setSequence(num.data.split('\n').slice(0, -1));
	};

	return (
		<>
			<h1>My app</h1>
			<Guesses guessNumber={guessNumber} />
			<Numbers setGuessNumber={setGuessNumber} sequence={sequence} />
			{sequence && <h2>{sequence}</h2>}
			<button onClick={getSequence}>Get new sequence</button>
		</>
	);
}

export default App;
