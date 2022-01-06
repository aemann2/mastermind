import React, { useState } from 'react';

const RegisterForm = () => {
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
		console.log('Submitted');
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
				></input>
				<label htmlFor='email'>Password</label>
				<input
					type='password'
					name='password'
					value={password}
					onChange={onChange}
				></input>
				<label htmlFor='email'>Confirm Password</label>
				<input
					type='password'
					name='password2'
					value={password2}
					onChange={onChange}
				></input>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default RegisterForm;
