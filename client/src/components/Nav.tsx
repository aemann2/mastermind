import React from 'react';
// import { Link } from 'react-router-dom';

interface IProps {
	setInstructionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav: React.FC<IProps> = ({ setInstructionModalOpen }) => {
	return (
		<nav>
			{/* <Link to='/login'>Log In</Link> */}
			<button onClick={() => setInstructionModalOpen((prev) => !prev)}>
				Instructions
			</button>
		</nav>
	);
};

export default Nav;
