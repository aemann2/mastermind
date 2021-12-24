import { useState } from 'react';
import axios from 'axios';
import Guesses from './components/Guesses';

function App() {
	const [sequence, setSequence] = useState<[number] | null>(null);
	const [entry, setEntry] = useState<number>(0);
	const [guess, setGuess] = useState<number>(0);

	const getSequence = async () => {
		const num = await axios(
			'https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new'
		);
		setSequence(num.data.split('\n').slice(0, -1));
	};

	const compareSequence = () => {
		if (sequence) {
			if (sequence.join('') === entry.toString()) {
				console.log(true);
			} else {
				console.log(false);
			}
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		compareSequence();
		setGuess((prev) => prev + 1);
	};

	return (
		<>
			<h1>My app</h1>
			<Guesses guess={guess} />
			<form onSubmit={handleSubmit}>
				<input
					type='number'
					onChange={(e: any) => setEntry(e.target.value)}
					value={entry}
				/>
				<button>Submit</button>
			</form>
			{sequence && <h2>{sequence}</h2>}
			<button onClick={getSequence}>Get new sequence</button>
		</>
	);
}

export default App;
