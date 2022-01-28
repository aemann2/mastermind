import { useState, useEffect } from 'react';
import { Results } from '../types/types';
import Button from '../ui/Button';
import { compareSequence, digitCheck } from '../utils/utils';
import styles from '../styles/Numbers.module.scss';
interface IProps {
	setWin: React.Dispatch<React.SetStateAction<boolean>>;
	numberOfGuesses: number;
	setNumberOfGuesses: React.Dispatch<React.SetStateAction<number>>;
	sequence: number[] | null;
	gameEndModalOpen: boolean;
	setGameEndModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setGuessSequence: React.Dispatch<React.SetStateAction<Results[] | []>>;
	roundStarted: boolean;
	setRoundStarted: React.Dispatch<React.SetStateAction<boolean>>;
	numberOfInputs: number;
}

interface IState {
	[key: number]: number;
}

const Numbers: React.FC<IProps> = ({
	setWin,
	numberOfGuesses,
	setNumberOfGuesses,
	sequence,
	setGuessSequence,
	gameEndModalOpen,
	setGameEndModalOpen,
	roundStarted,
	setRoundStarted,
	numberOfInputs,
}) => {
	const [inputValues, setInputValues] = useState<IState>({});

	useEffect(() => {
		if (!gameEndModalOpen) {
			const inputValues: IState = {};
			for (let i = 0; i < numberOfInputs; i++) {
				inputValues[i] = 0;
			}
			setInputValues(inputValues);
		}
	}, [numberOfInputs, gameEndModalOpen]);

	const inputs = [];

	for (let i = 0; i < numberOfInputs; i++) {
		inputs.push(
			<input
				className={styles.inputBox}
				key={`input ${i}`}
				// using telephone type...a trick to get around problems with digit entry
				type='tel'
				id={`${i}`}
				name={`${i}`}
				min={0}
				max={7}
				value={inputValues[i] || 0}
				onChange={handleChange}
				onFocus={handleFocus}
			/>
		);
	}

	// focus input box on first click
	function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
		e.target.focus();
		e.target.select();
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		if (!digitCheck(parseInt(value))) {
			e.target.select();
		} else {
			if (!roundStarted) {
				setRoundStarted(true);
			}
			setInputValues({
				...inputValues,
				[e.target.name]: parseInt(value),
			});
			e.target.select();
		}
	}

	useEffect(() => {
		if (!roundStarted) {
			setInputValues(inputValues);
		}
	}, [inputValues, roundStarted]);

	const runCompareSequence = () => {
		const entryArr = Object.values(inputValues);
		if (sequence) {
			if (sequence!.join('').toString() === entryArr.join('')) {
				setGameEndModalOpen((prev) => !prev);
				setWin(true);
			} else {
				const { N, L } = compareSequence(entryArr, sequence);
				setGuessSequence((prev: Results[] | []) => [
					...prev,
					{ guessSequence: entryArr, N: N, L: L },
				]);
			}
			setNumberOfGuesses((prev) => prev + 1);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!roundStarted) {
			setRoundStarted(true);
		}
		runCompareSequence();
	};

	return (
		<div className={styles.numbers}>
			<form onSubmit={handleSubmit}>
				<div className={styles.inputs}>{inputs}</div>
				{sequence ? (
					<Button disabled={gameEndModalOpen || numberOfGuesses > 10}>
						Submit
					</Button>
				) : (
					<h4 className={styles.loading}>Loading numbers...</h4>
				)}
			</form>
		</div>
	);
};

export default Numbers;
