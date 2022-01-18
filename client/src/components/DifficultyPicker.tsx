import React from 'react';
import Button from '../ui/Button';

interface IProps {
	setNumberOfInputs: React.Dispatch<React.SetStateAction<number>>;
}

const DifficultyPicker: React.FC<IProps> = ({ setNumberOfInputs }) => {
	const clickHandler = (difficultyRating: number) => {
		setNumberOfInputs(difficultyRating);
	};

	return (
		<div>
			<p>Choose your difficulty:</p>
			<Button onClick={() => clickHandler(4)}>Easy</Button>
			<Button onClick={() => clickHandler(5)}>Medium</Button>
			<Button onClick={() => clickHandler(6)}>Hard</Button>
		</div>
	);
};

export default DifficultyPicker;
