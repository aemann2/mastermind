import React, { useState } from 'react';

const LoginForm = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { email, password } = user;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Submitted');
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
				></input>
				<label htmlFor='email'>Password</label>
				<input
					type='password'
					name='password'
					value={password}
					onChange={onChange}
				></input>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default LoginForm;
