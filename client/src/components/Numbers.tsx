import { useState, useEffect } from 'react';
import { Results } from '../types/types';
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
}) => {
	const [inputValues, setInputs] = useState<IState>({
		1: 0,
		2: 0,
		3: 0,
		4: 0,
	});
	const numberOfInputs = 4;
	const inputs = [];
	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) =>
		e.target.select();
	for (let i = 1; i <= numberOfInputs; i++) {
		inputs.push(
			<input
				className={styles.inputBox}
				key={`input ${i}`}
				type='number'
				id={`${i}`}
				name={`${i}`}
				min={0}
				max={7}
				value={inputValues[i]}
				onChange={handleChange}
				onFocus={handleFocus}
			/>
		);
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		if (!digitCheck(parseInt(value))) return false;
		setInputs({
			...inputValues,
			[e.target.name]: parseInt(value),
		});
	}

	useEffect(() => {
		if (!gameEndModalOpen) {
			setInputs({
				1: 0,
				2: 0,
				3: 0,
				4: 0,
			});
		}
	}, [gameEndModalOpen]);

	const runCompareSequence = () => {
		const entryArr = Object.values(inputValues);
		if (sequence) {
			if (sequence!.join('') === entryArr.join('')) {
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
		runCompareSequence();
	};

	return (
		<div className={styles.numbers}>
			<form onSubmit={handleSubmit}>
				<div className={styles.inputs}>{inputs}</div>
				<button disabled={gameEndModalOpen || numberOfGuesses > 10}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Numbers;
