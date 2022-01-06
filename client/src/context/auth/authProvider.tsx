import React, { useReducer, createContext } from 'react';
import AuthReducer, { defaultAuthState } from './authReducer';

interface IProps {
	children: React.ReactNode;
}

export const AuthContext = createContext({
	token: null,
	isAuthenticated: null,
	loading: false,
	user: null,
	error: null,
});

const AuthProvider: React.FC<IProps> = ({ children }) => {
	// FIXME: This is a temporary solution
	//@ts-ignore
	const [state, dispatch] = useReducer(AuthReducer, defaultAuthState);
	// Load User

	// Register User

	// Login User

	// Logout User

	// Clear error

	return (
		<AuthContext.Provider
			// FIXME: This is a temporary solution
			//@ts-ignore
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				// FIXME: This is a temporary solution
				//@ts-ignore
				token: state.token,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
