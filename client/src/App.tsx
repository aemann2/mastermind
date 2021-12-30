import { useState, useEffect } from 'react';
import axios from 'axios';
import Guesses from './components/Guesses';
import Numbers from './components/Numbers';
import GameEndModal from './components/GameEndModal';
import InstructionsModal from './components/InstructionsModal';
import GuessHistory from './components/GuessHistory';
// import Nav from './components/Nav';
import { Results } from './types/types';

function App() {
	const [sequence, setSequence] = useState<string[] | null>(null);
	const [guessSequence, setGuessSequence] = useState<Results[] | []>([]);
	const [numberOfGuesses, setNumberOfGuesses] = useState<number>(0);
	const [win, setWin] = useState<boolean>(false);
	const [gameEndModalOpen, setGameEndModalOpen] = useState<boolean>(false);
	const [instructionModalOpen, setInstructionModalOpen] =
		useState<boolean>(false);

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
			setGameEndModalOpen(true);
		}
	}, [numberOfGuesses]);

	const resetGame = () => {
		setWin(false);
		setGuessSequence([]);
		setNumberOfGuesses(0);
		setGameEndModalOpen(false);
		getSequence();
	};

	return (
		<>
			{/* <Nav /> */}
			<h1>Mastermind</h1>
			<Guesses numberOfGuesses={numberOfGuesses} />
			<Numbers
				setWin={setWin}
				gameEndModalOpen={gameEndModalOpen}
				numberOfGuesses={numberOfGuesses}
				setNumberOfGuesses={setNumberOfGuesses}
				setGameEndModalOpen={setGameEndModalOpen}
				sequence={sequence}
				setGuessSequence={setGuessSequence}
			/>
			<GuessHistory guessSequence={guessSequence} />
			{win ? (
				<GameEndModal gameEndModalOpen={gameEndModalOpen} resetGame={resetGame}>
					You Win!
				</GameEndModal>
			) : (
				<GameEndModal gameEndModalOpen={gameEndModalOpen} resetGame={resetGame}>
					You Lose!
				</GameEndModal>
			)}
			<InstructionsModal
				instructionModalOpen={instructionModalOpen}
				setInstructionModalOpen={setInstructionModalOpen}
			>
				Game instructions
			</InstructionsModal>
		</>
	);
}

export default App;
