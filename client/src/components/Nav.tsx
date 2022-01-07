import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/authProvider';
import styles from '../styles/Nav.module.scss';

interface IProps {
	setInstructionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav: React.FC<IProps> = ({ setInstructionModalOpen }) => {
	const { isAuthenticated, logout, user } = useContext(AuthContext);

	return (
		<div className={styles.navBar}>
			<nav>
				<div>
					<Link to='/'>Mastermind</Link>
					{user && <p>{user.email}</p>}
				</div>
				<div>
					{!isAuthenticated && (
						<>
							<Link to='/login'>Log In</Link>
							<Link to='/register'>Register</Link>
						</>
					)}
					{isAuthenticated && (
						<>
							<Link to='/scores'>Your Scores</Link>
							<button onClick={() => logout()}>Log Out</button>
						</>
					)}
					<button onClick={() => setInstructionModalOpen((prev) => !prev)}>
						Instructions
					</button>
				</div>
			</nav>
		</div>
	);
};

export default Nav;
