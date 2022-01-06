import React, { useReducer, createContext } from 'react';
import axios from 'axios';
import AuthReducer, { defaultAuthState } from './authReducer';

interface IProps {
	children: React.ReactNode;
}

interface Error {
	response: {
		data: {
			message: string;
		};
	};
}

export const AuthContext = createContext({
	token: null,
	isAuthenticated: null,
	loading: false,
	user: null,
	error: null,
	register: (email: string, password: string) => {},
});

const AuthProvider: React.FC<IProps> = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, defaultAuthState);
	// Load User

	// Register User
	const register = async (email: string, password: string) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post(
				'http://localhost:5000/api/signup',
				{ email, password },
				config
			);

			dispatch({
				type: 'REGISTER_SUCCESS',
				payload: res.data,
			});
		} catch (err: unknown) {
			const e = err as Error;
			dispatch({
				type: 'REGISTER_FAIL',
				payload: e.response.data.message,
			});
		}
	};

	// Login User

	// Logout User

	// Clear error

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register: register,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
