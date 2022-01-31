import React from 'react';
import Button from '../ui/Button';
import styles from '../styles/DifficultyPicker.module.scss';

interface IProps {
	setNumberOfInputs: React.Dispatch<React.SetStateAction<number>>;
}

const DifficultyPicker: React.FC<IProps> = ({ setNumberOfInputs }) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>, num: number) => {
		setNumberOfInputs(num);
	};
	return (
		<div className={styles.difficultyPicker}>
			<Button className={styles.easy} onClick={(e) => handleClick(e, 4)}>
				Easy
			</Button>
			<Button onClick={(e) => handleClick(e, 5)}>Medium</Button>
			<Button className={styles.hard} onClick={(e) => handleClick(e, 6)}>
				Hard
			</Button>
		</div>
	);
};

export default DifficultyPicker;
