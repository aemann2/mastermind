import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
	setInstructionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav: React.FC<IProps> = ({ setInstructionModalOpen }) => {
	return (
		<nav>
			<div>
				<h1>Mastermind</h1>
			</div>
			<div>
				<Link to='/auth'>Log In</Link>
				<button onClick={() => setInstructionModalOpen((prev) => !prev)}>
					Instructions
				</button>
			</div>
		</nav>
	);
};

export default Nav;
