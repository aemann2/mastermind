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
	const numRows = 2;
	const numberOfInputs = 4;
	const emptyInputs = {};
	for (let i = 0; i < numberOfInputs * numRows; i++) {
		//@ts-ignore
		emptyInputs[i] = 0;
	}

	const [inputValues, setInputs] = useState<IState>(emptyInputs);

	//@ts-ignore
	const inputs = [];
	let inputCounter = 0;

	for (let j = 1; j <= numRows; j++) {
		const inputRow = [];
		for (let i = 1; i <= numberOfInputs; i++) {
			inputRow.push(
				<input
					className={styles.inputBox}
					key={`input ${inputCounter}`}
					// using telephone type...a trick to get around problems with digit entry
					type='tel'
					id={`${i}`}
					name={`${inputCounter}`}
					min={0}
					max={7}
					value={inputValues[inputCounter]}
					onChange={handleChange}
					onFocus={handleFocus}
				/>
			);
			inputCounter++;
		}
		inputs.push(inputRow);
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
			setInputs({
				...inputValues,
				[e.target.name]: parseInt(value),
			});
			e.target.select();
		}
	}

	useEffect(() => {
		if (!gameEndModalOpen) {
			setInputs(emptyInputs);
		}
	}, [gameEndModalOpen]);

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
		runCompareSequence();
	};

	return (
		<div className={styles.numbers}>
			<form onSubmit={handleSubmit}>
				<div className={styles.inputs}>
					{inputs.map((inputRow) => {
						return <div style={{ marginTop: '1rem' }}>{inputRow}</div>;
					})}
				</div>
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
