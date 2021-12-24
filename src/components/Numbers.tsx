import { useState } from 'react';

interface IProps {
	setGuessNumber: React.Dispatch<React.SetStateAction<number>>;
	sequence: [number] | null;
}

const Numbers: React.FC<IProps> = ({ setGuessNumber, sequence }) => {
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
