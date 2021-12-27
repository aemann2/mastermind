import { useState } from 'react';
import axios from 'axios';
import Guesses from './components/Guesses';
import Numbers from './components/Numbers';
import Modal from './ui/Modal';
import GuessHistory from './components/GuessHistory';
// import Nav from './components/Nav';
import { Results } from './types/types';

function App() {
	const [sequence, setSequence] = useState<[number] | null>(null);
	const [guessSequence, setGuessSequence] = useState<Results[] | []>([]);
	const [guessNumber, setGuessNumber] = useState<number>(0);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const getSequence = async () => {
		const num = await axios(
			'https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new'
		);
		setSequence(num.data.split('\n').slice(0, -1));
	};

	return (
		<>
			{/* <Nav /> */}
			<h1>My app</h1>
			<Guesses guessNumber={guessNumber} />
			<Numbers
				setGuessNumber={setGuessNumber}
				sequence={sequence}
				setGuessSequence={setGuessSequence}
			/>
			{sequence && <h2>{sequence}</h2>}
			<button onClick={getSequence}>Get new sequence</button>
			<button onClick={() => setIsOpen((prev) => !prev)}>Open Modal</button>
			<GuessHistory guessSequence={guessSequence} />
			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				You win!
				<button onClick={() => setIsOpen((prev) => !prev)}>Close</button>
			</Modal>
		</>
	);
}

export default App;
