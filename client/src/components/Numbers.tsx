import { useState, useEffect } from 'react';
import { Results } from '../types/types';
import { compareSequence } from '../utils/utils';
interface IProps {
	setWin: React.Dispatch<React.SetStateAction<boolean>>;
	numberOfGuesses: number;
	setNumberOfGuesses: React.Dispatch<React.SetStateAction<number>>;
	sequence: [number] | null;
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
	const [comparisonResults, setComparisonResults] = useState({ N: 0, L: 0 });

	useEffect(() => {
		if (!modalOpen) {
			setEntry(0);
		}
	}, [modalOpen]);

	const runCompareSequence = () => {
		const entryString = entry.toString();
		const sequenceString = sequence!.join('');
		if (sequence) {
			if (sequenceString === entryString) {
				setModalOpen((prev) => !prev);
				setWin(true);
			} else {
				setComparisonResults(compareSequence(entryString, sequenceString));
			}
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		runCompareSequence();
		setNumberOfGuesses((prev) => prev + 1);
		setGuessSequence((prev: Results[] | []) => [
			...prev,
			{ sequence: entry, N: comparisonResults.N, L: comparisonResults.L },
		]);
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
