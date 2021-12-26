import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<nav>
			<Link to='/signin'>Sign In</Link>
			<Link to='/highscores'>High Scores</Link>
		</nav>
	);
};

export default Nav;
