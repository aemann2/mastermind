import { useState, useEffect } from 'react';
import { Results } from '../types/types';
import { compareSequence } from '../utils/utils';
interface IProps {
	setWin: React.Dispatch<React.SetStateAction<boolean>>;
	numberOfGuesses: number;
	setNumberOfGuesses: React.Dispatch<React.SetStateAction<number>>;
	sequence: number[] | null;
	gameEndModalOpen: boolean;
	setGameEndModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setGuessSequence: React.Dispatch<React.SetStateAction<Results[] | []>>;
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
	const [inputs, setInputs] = useState({
		1: 0,
		2: 0,
		3: 0,
		4: 0,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputs({
			...inputs,
			[e.target.name]: parseInt(value),
		});
	};

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
		const entryArr = Object.values(inputs);
		const sequenceString = sequence!.join('');
		if (sequence) {
			if (sequenceString === entryArr.join('')) {
				setGameEndModalOpen((prev) => !prev);
				setWin(true);
			} else {
				const { N, L } = compareSequence(entryArr, sequence);
				console.log(compareSequence(entryArr, sequence));
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
		<>
			<form onSubmit={handleSubmit}>
				<input
					type='number'
					id='1'
					name='1'
					min={0}
					max={8}
					value={inputs[1]}
					onChange={handleChange}
				></input>
				<input
					type='number'
					id='2'
					name='2'
					min={0}
					max={8}
					value={inputs[2]}
					onChange={handleChange}
				></input>
				<input
					type='number'
					id='3'
					name='3'
					min={0}
					max={8}
					value={inputs[3]}
					onChange={handleChange}
				></input>
				<input
					type='number'
					id='4'
					name='4'
					min={0}
					max={8}
					value={inputs[4]}
					onChange={handleChange}
				></input>
				<button disabled={gameEndModalOpen || numberOfGuesses > 10}>
					Submit
				</button>
			</form>
		</>
	);
};

export default Numbers;
