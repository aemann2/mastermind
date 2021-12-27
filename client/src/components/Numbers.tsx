import { useState, useEffect } from 'react';
import { Results } from '../types/types';

interface IProps {
	setWin: React.Dispatch<React.SetStateAction<boolean>>;
	guessNumber: number;
	setGuessNumber: React.Dispatch<React.SetStateAction<number>>;
	sequence: [number] | null;
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setGuessSequence: React.Dispatch<React.SetStateAction<Results[] | []>>;
}

const Numbers: React.FC<IProps> = ({
	setWin,
	guessNumber,
	setGuessNumber,
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

	const compareSequence = () => {
		if (sequence) {
			if (sequence.join('') === entry.toString()) {
				setModalOpen((prev) => !prev);
				setWin(true);
			}
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		compareSequence();
		setGuessNumber((prev) => prev + 1);
		setGuessSequence((prev: Results[] | []) => [
			...prev,
			{ sequence: entry, N: 0, L: 0 },
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
				<button disabled={modalOpen || guessNumber > 10}>Submit</button>
			</form>
		</>
	);
};

export default Numbers;
