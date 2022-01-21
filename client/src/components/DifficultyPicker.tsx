import React from 'react';
import Button from '../ui/Button';
import styles from '../styles/DifficultyPicker.module.scss';

const DifficultyPicker = () => {
	return (
		<div className={styles.difficultyPicker}>
			<Button>Easy</Button>
			<Button>Medium</Button>
			<Button>Hard</Button>
		</div>
	);
};

export default DifficultyPicker;
