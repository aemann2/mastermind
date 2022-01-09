import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import Guesses from '../components/Guesses';
import Numbers from '../components/Numbers';
import GameEndModal from '../components/GameEndModal';
import InstructionsModal from '../components/InstructionsModal';
import GuessHistory from '../components/GuessHistory';
import Nav from '../components/Nav';
import { AuthContext } from '../context/auth/authProvider';
import { Results } from '../types/types';
import styles from '../styles/pages/Index.module.scss';

function Index() {
	const [sequence, setSequence] = useState<number[] | null>(null);
	const [guessSequence, setGuessSequence] = useState<Results[] | []>([]);
	const [numberOfGuesses, setNumberOfGuesses] = useState<number>(0);
	const [win, setWin] = useState<boolean>(false);
	const [gameEndModalOpen, setGameEndModalOpen] = useState<boolean>(false);
	const [instructionModalOpen, setInstructionModalOpen] =
		useState<boolean>(false);
	const { isAuthenticated, loadUser } = useContext(AuthContext);

	// Ref to get around useEffect dependency warning
	const loadUserRef = useRef(loadUser);

	const getSequence = async () => {
		const num = await axios(
			'https://mastermind-amann.herokuapp.com/api/randomnum'
		);
		// Log to show mystery number
		console.log(num.data.number);
		setSequence(num.data.number);
	};

	useEffect(() => {
		getSequence();
		loadUserRef.current();
	}, []);

	useEffect(() => {
		if (numberOfGuesses >= 10) {
			setGameEndModalOpen(true);
		}
	}, [numberOfGuesses]);

	const handlePost = async () => {
		let solved;
		win ? (solved = true) : (solved = false);
		try {
			await axios.post('https://mastermind-amann.herokuapp.com/api/scores', {
				sequence: sequence,
				guesses: numberOfGuesses,
				solved: solved,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const resetGame = async () => {
		if (isAuthenticated) {
			await handlePost();
		}
		setWin(false);
		setGuessSequence([]);
		setNumberOfGuesses(0);
		setGameEndModalOpen(false);
		getSequence();
	};

	return (
		<>
			<Nav setInstructionModalOpen={setInstructionModalOpen} />
			<main className={styles.mainContent}>
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
						<h3>
							You won in {numberOfGuesses}
							{numberOfGuesses > 1 ? ' guesses' : ' guess'}!
						</h3>
						<p>Close this window to try again.</p>
					</GameEndModal>
				) : (
					<GameEndModal
						gameEndModalOpen={gameEndModalOpen}
						resetGame={resetGame}
					>
						<h3>Aww, you lost this time.</h3>
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
