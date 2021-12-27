import { useState } from 'react';
import { Results } from '../types/types';

interface IProps {
	setGuessNumber: React.Dispatch<React.SetStateAction<number>>;
	sequence: [number] | null;
	setGuessSequence: React.Dispatch<React.SetStateAction<Results[] | []>>;
}

const Numbers: React.FC<IProps> = ({
	setGuessNumber,
	sequence,
	setGuessSequence,
}) => {
	const [entry, setEntry] = useState<number>(0);

	const compareSequence = () => {
		if (sequence) {
			if (sequence.join('') === entry.toString()) {
				console.log(true);
			} else {
				console.log(false);
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
				<button>Submit</button>
			</form>
		</>
	);
};

export default Numbers;
