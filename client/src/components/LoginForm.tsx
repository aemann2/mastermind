import React, { useState, useContext } from 'react';
import Button from '../ui/Button';
import styles from '../styles/LoginForm.module.scss';
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
		<div className={styles.loginForm}>
			<h1>Log In</h1>
			<form onSubmit={onSubmit}>
				<div>
					<label id='email' htmlFor='email'>
						Email
					</label>
					<input
						type='text'
						name='email'
						aria-labelledby='email'
						placeholder='Enter your email'
						value={email}
						onChange={onChange}
						required
					/>
				</div>
				<div>
					<label id='password' htmlFor='password'>
						Password
					</label>
					<input
						type='password'
						name='password'
						aria-labelledby='password'
						placeholder='Enter your password'
						value={password}
						onChange={onChange}
						required
					/>
				</div>
				<Button>Log In</Button>
			</form>
			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
};

export default LoginForm;
