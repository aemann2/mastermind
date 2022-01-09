import React from 'react';
import styles from '../styles/Button.module.scss';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
	children,
	...props
}) => {
	return (
		<button className={styles.button} {...props}>
			{children}
		</button>
	);
};

export default Button;
