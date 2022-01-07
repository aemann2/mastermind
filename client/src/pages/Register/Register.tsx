import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/authProvider';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm';

const Register = () => {
	const { isAuthenticated } = useContext(AuthContext);
	let navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated, navigate]);

	return (
		<div>
			<RegisterForm />
		</div>
	);
};

export default Register;
