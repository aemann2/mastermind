import { useState, useEffect, useContext, useCallback, useRef } from 'react';
import axios from 'axios';
import Timer from '../components/Timer';
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
	const [elapsedTime, setElapsedTime] = useState({
		mins: 0,
		secs: 0,
	});
	const [roundStarted, setRoundStarted] = useState(false);
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
		const num = await axios('/api/randomnum');
		// Log to show mystery number
		console.log(num.data.number);
		setSequence(num.data.number);
	};

	useEffect(() => {
		getSequence();
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			loadUserRef.current();
		}
	}, [isAuthenticated]);

	useEffect(() => {
		if (numberOfGuesses >= 10 || win) {
			setGameEndModalOpen(true);
			setRoundStarted(false);
		}
	}, [numberOfGuesses, win]);

	const handlePost = async () => {
		const { mins, secs } = elapsedTime;
		let solved;
		win ? (solved = true) : (solved = false);
		try {
			await axios.post('/api/scores', {
				sequence: sequence,
				time: `${mins}:${secs < 10 ? `0${secs}` : secs}`,
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
		setSequence(null);
		setElapsedTime({ mins: 0, secs: 0 });
		getSequence();
	};

	const callbackElapsedTime = useCallback(setElapsedTime, [setElapsedTime]);

	return (
		<>
			<Nav setInstructionModalOpen={setInstructionModalOpen} />
			<main className={styles.mainContent}>
				<Timer
					roundStarted={roundStarted}
					gameEndModalOpen={gameEndModalOpen}
					setElapsedTime={callbackElapsedTime}
				/>
				<Guesses numberOfGuesses={numberOfGuesses} />
				<Numbers
					setWin={setWin}
					gameEndModalOpen={gameEndModalOpen}
					numberOfGuesses={numberOfGuesses}
					setNumberOfGuesses={setNumberOfGuesses}
					setGameEndModalOpen={setGameEndModalOpen}
					sequence={sequence}
					setGuessSequence={setGuessSequence}
					roundStarted={roundStarted}
					setRoundStarted={setRoundStarted}
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
						<h3>
							Your time was:{' '}
							<span className={styles.bold}>{`${elapsedTime.mins}:${
								elapsedTime.secs < 10
									? `0${elapsedTime.secs}`
									: elapsedTime.secs
							}`}</span>
						</h3>
						<p>Close this window to try again.</p>
					</GameEndModal>
				) : (
					<GameEndModal
						gameEndModalOpen={gameEndModalOpen}
						resetGame={resetGame}
					>
						<h3>Aww, you lost this time.</h3>
						<h3>
							The sequence was: <span className={styles.bold}>{sequence}</span>
						</h3>
						<h3>
							Your time was:{' '}
							<span className={styles.bold}>{`${elapsedTime.mins}:${
								elapsedTime.secs < 10
									? `0${elapsedTime.secs}`
									: elapsedTime.secs
							}`}</span>
						</h3>
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
