import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/authProvider';
import styles from '../styles/Nav.module.scss';

interface IProps {
	setInstructionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav: React.FC<IProps> = ({ setInstructionModalOpen }) => {
	const { isAuthenticated, logout } = useContext(AuthContext);

	return (
		<div className={styles.navBar}>
			<nav>
				<ul>
					<div>
						<li className={styles.mainLink}>
							<Link to='/'>Mastermind</Link>
						</li>
					</div>
					<div>
						{!isAuthenticated && (
							<>
								<li className={styles.leftLink}>
									<Link to='/login'>Log In</Link>
								</li>
								<li className={styles.leftLink}>
									<Link to='/register'>Register</Link>
								</li>
							</>
						)}
						{isAuthenticated && (
							<>
								<li className={styles.leftLink}>
									<Link to='/scores'>Scores</Link>
								</li>
								<li
									className={`${styles.leftLink} ${styles.textButton}`}
									onClick={() => logout()}
								>
									Log Out
								</li>
							</>
						)}
						<li
							className={`${styles.leftLink} ${styles.textButton}`}
							onClick={() => setInstructionModalOpen((prev) => !prev)}
						>
							Rules
						</li>
					</div>
				</ul>
			</nav>
		</div>
	);
};

export default Nav;
