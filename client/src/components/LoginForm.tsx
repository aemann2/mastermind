import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/auth/authProvider';

const LoginForm = () => {
	const { login, error } = useContext(AuthContext);

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { email, password } = user;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await login(email, password);
	};

	return (
		<div>
			<h1>Log In</h1>
			<form onSubmit={onSubmit}>
				<label htmlFor='email'>Email</label>
				<input
					type='text'
					name='email'
					value={email}
					onChange={onChange}
					required
				></input>
				<label htmlFor='email'>Password</label>
				<input
					type='password'
					name='password'
					value={password}
					onChange={onChange}
					required
				></input>
				<button>Submit</button>
			</form>
			{error && <p>{error}</p>}
		</div>
	);
};

export default LoginForm;
