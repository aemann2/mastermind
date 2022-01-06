import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/auth/authProvider';

const RegisterForm = () => {
	const { register } = useContext(AuthContext);

	const [user, setUser] = useState({
		email: '',
		password: '',
		password2: '',
	});

	const { email, password, password2 } = user;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		register(email, password);
		setUser({
			email: '',
			password: '',
			password2: '',
		});
	};

	return (
		<div>
			<h1>Register</h1>
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
					minLength={6}
				></input>
				<label htmlFor='email'>Confirm Password</label>
				<input
					type='password'
					name='password2'
					value={password2}
					onChange={onChange}
					required
					minLength={6}
				></input>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default RegisterForm;
