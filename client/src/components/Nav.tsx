import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<nav>
			<Link to='/login'>Log In</Link>
			<Link to='/instructions'>Instructions</Link>
		</nav>
	);
};

export default Nav;
