import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Nav.module.scss';

interface IProps {
	setInstructionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav: React.FC<IProps> = ({ setInstructionModalOpen }) => {
	return (
		<div className={styles.navBar}>
			<nav>
				<div>
					<h1>Mastermind</h1>
				</div>
				<div>
					<Link to='/login'>Log In</Link>
					<Link to='/register'>Register</Link>
					<button onClick={() => setInstructionModalOpen((prev) => !prev)}>
						Instructions
					</button>
				</div>
			</nav>
		</div>
	);
};

export default Nav;
