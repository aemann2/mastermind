import { useState, useEffect } from 'react';
import { Results } from '../types/types';
import { compareSequence } from '../utils/utils';
interface IProps {
	setWin: React.Dispatch<React.SetStateAction<boolean>>;
	numberOfGuesses: number;
	setNumberOfGuesses: React.Dispatch<React.SetStateAction<number>>;
	sequence: string[] | null;
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setGuessSequence: React.Dispatch<React.SetStateAction<Results[] | []>>;
}

const Numbers: React.FC<IProps> = ({
	setWin,
	numberOfGuesses,
	setNumberOfGuesses,
	sequence,
	setGuessSequence,
	modalOpen,
	setModalOpen,
}) => {
	const [entry, setEntry] = useState<number>(0);

	useEffect(() => {
		if (!modalOpen) {
			setEntry(0);
		}
	}, [modalOpen]);

	const runCompareSequence = () => {
		const entryArr = entry.toString().split('');
		const sequenceString = sequence!.join('');
		if (sequence) {
			if (sequenceString === entry.toString()) {
				setModalOpen((prev) => !prev);
				setWin(true);
			} else {
				const { N, L } = compareSequence(entryArr, sequence);
				setGuessSequence((prev: Results[] | []) => [
					...prev,
					{ guessSequence: entry, N: N, L: L },
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
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setEntry(Number(e.target.value))
					}
					value={entry}
				/>
				<button disabled={modalOpen || numberOfGuesses > 10}>Submit</button>
			</form>
		</>
	);
};

export default Numbers;
