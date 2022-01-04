import { useState, useEffect } from 'react';
import axios from 'axios';
import Guesses from '../../components/Guesses';
import Numbers from '../../components/Numbers';
import GameEndModal from '../../components/GameEndModal';
import InstructionsModal from '../../components/InstructionsModal';
import GuessHistory from '../../components/GuessHistory';
import Nav from '../../components/Nav';
import { Results } from '../../types/types';
import '../../styles/index.scss';

function Index() {
	const [sequence, setSequence] = useState<number[] | null>(null);
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
		// Log to show mystery number
		// console.log(num);
		const splitNum = num.data.split('\n').slice(0, -1);
		setSequence(splitNum.map((num: string) => parseInt(num, 10)));
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
			<Nav setInstructionModalOpen={setInstructionModalOpen} />
			<main className='mainContent'>
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
					<GameEndModal
						gameEndModalOpen={gameEndModalOpen}
						resetGame={resetGame}
					>
						<p>You won in {numberOfGuesses} guesses!</p>
						<p>Close this window to try again.</p>
					</GameEndModal>
				) : (
					<GameEndModal
						gameEndModalOpen={gameEndModalOpen}
						resetGame={resetGame}
					>
						<p>Aww, you lost this time.</p>
						<p>Close this window to try again.</p>
					</GameEndModal>
				)}
				<InstructionsModal
					instructionModalOpen={instructionModalOpen}
					setInstructionModalOpen={setInstructionModalOpen}
				/>
			</main>
		</>
	);
}

export default Index;
