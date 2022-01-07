import React, { useReducer, createContext } from 'react';
import axios from 'axios';
import AuthReducer, { defaultAuthState } from './authReducer';
import { setAuthToken } from '../../utils/utils';

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
	login: (email: string, password: string) => {},
	logout: () => {},
	loadUser: () => {},
	// clearError: () => {},
});

const AuthProvider: React.FC<IProps> = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, defaultAuthState);

	// Load User
	const loadUser = async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get('http://localhost:5000/api/auth');

			dispatch({
				type: 'USER_LOADED',
				payload: res.data,
			});
		} catch (err) {
			dispatch({ type: 'AUTH_ERROR' });
		}
	};

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

			loadUser();
		} catch (err: unknown) {
			const e = err as Error;
			dispatch({
				type: 'REGISTER_FAIL',
				payload: e.response.data.message,
			});
		}
	};

	// // Clear error
	// const clearError = () => {
	// 	dispatch({
	// 		type: 'CLEAR_ERROR',
	// 	});
	// };

	// Login User
	const login = async (email: string, password: string) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.post(
				'http://localhost:5000/api/auth',
				{ email, password },
				config
			);

			dispatch({
				type: 'REGISTER_SUCCESS',
				payload: res.data,
			});

			loadUser();
		} catch (err: unknown) {
			const e = err as Error;
			dispatch({
				type: 'LOGIN_FAIL',
				payload: e.response.data.message,
			});
		}
	};

	// Logout User
	const logout = () => {
		console.log('logout user');
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				login,
				logout,
				loadUser,
				// clearError,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
