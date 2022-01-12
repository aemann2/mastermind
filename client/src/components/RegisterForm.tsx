import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/auth/authProvider';
import Button from '../ui/Button';
import styles from '../styles/RegisterForm.module.scss';

const RegisterForm = () => {
	const { register, setError, error } = useContext(AuthContext);

	const [user, setUser] = useState({
		email: '',
		password1: '',
		password2: '',
	});

	const { email, password1, password2 } = user;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (password1 !== password2) {
			setError('Passwords do not match');
			return;
		}
		await register(email, password1);
	};

	return (
		<div className={styles.registerForm}>
			<h1>Register</h1>
			<form onSubmit={onSubmit}>
				<label id='email' htmlFor='email'>
					Email
				</label>
				<input
					type='email'
					name='email'
					aria-labelledby='email'
					value={email}
					onChange={onChange}
					required
				></input>
				<label id='password1' htmlFor='password1'>
					Password
				</label>
				<input
					type='password'
					name='password1'
					aria-labelledby='password1'
					value={password1}
					onChange={onChange}
					required
					minLength={6}
				></input>
				<label id='password2' htmlFor='password2'>
					Confirm Password
				</label>
				<input
					type='password'
					name='password2'
					aria-labelledby='password2'
					value={password2}
					onChange={onChange}
					required
					minLength={6}
				></input>
				<Button>Register</Button>
			</form>
			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
};

export default RegisterForm;
