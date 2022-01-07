import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/authProvider';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';

const Login = () => {
	const { isAuthenticated } = useContext(AuthContext);
	let navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated, navigate]);

	return (
		<div>
			<LoginForm />
		</div>
	);
};

export default Login;
