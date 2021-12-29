import { useState, useEffect } from 'react';
import axios from 'axios';
import Guesses from './components/Guesses';
import Numbers from './components/Numbers';
import GameEndModal from './components/GameEndModal';
import GuessHistory from './components/GuessHistory';
// import Nav from './components/Nav';
import { Results } from './types/types';

function App() {
	const [sequence, setSequence] = useState<string[] | null>(null);
	const [guessSequence, setGuessSequence] = useState<Results[] | []>([]);
	const [numberOfGuesses, setNumberOfGuesses] = useState<number>(0);
	const [win, setWin] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const getSequence = async () => {
		const num = await axios(
			'https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new'
		);
		console.log(num);
		const splitNum = num.data.split('\n').slice(0, -1);
		setSequence(splitNum);
		// console.log(splitNum);
	};

	useEffect(() => {
		getSequence();
	}, []);

	useEffect(() => {
		if (numberOfGuesses >= 10) {
			setModalOpen(true);
		}
	}, [numberOfGuesses]);

	const resetGame = () => {
		setWin(false);
		setGuessSequence([]);
		setNumberOfGuesses(0);
		setModalOpen(false);
		getSequence();
	};

	return (
		<>
			{/* <Nav /> */}
			<h1>Mastermind</h1>
			<Guesses numberOfGuesses={numberOfGuesses} />
			<Numbers
				setWin={setWin}
				modalOpen={modalOpen}
				numberOfGuesses={numberOfGuesses}
				setNumberOfGuesses={setNumberOfGuesses}
				setModalOpen={setModalOpen}
				sequence={sequence}
				setGuessSequence={setGuessSequence}
			/>
			<GuessHistory guessSequence={guessSequence} />
			{modalOpen &&
				(win ? (
					<GameEndModal setModalOpen={setModalOpen} resetGame={resetGame}>
						You Win!
					</GameEndModal>
				) : (
					<GameEndModal setModalOpen={setModalOpen} resetGame={resetGame}>
						You Lose!
					</GameEndModal>
				))}
		</>
	);
}

export default App;
