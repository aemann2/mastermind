import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth/authProvider';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import styles from '../styles/pages/Register.module.scss';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
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
			<div className={styles.register}>
				<RegisterForm />
			</div>
		</>
	);
};

export default Register;
