import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth/authProvider';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Nav from '../components/Nav';
import styles from '../styles/pages/Login.module.scss';

const Login = () => {
	const { isAuthenticated } = useContext(AuthContext);
	let navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated, navigate]);

	return (
		<>
			<Nav />
			<div className={styles.login}>
				<LoginForm />
			</div>
		</>
	);
};

export default Login;
