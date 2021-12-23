import { useState } from 'react';
import axios from 'axios';

function App() {
	const [sequence, setSequence] = useState<[number] | null>(null);
	const [entry, setEntry] = useState(0);

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
	};

	return (
		<>
			<h1>My app</h1>
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
