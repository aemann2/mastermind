interface User {
	user: {
		_id: string;
		email: string;
		date: string;
	};
}

interface IState {
	token: string | null;
	isAuthenticated: boolean | null;
	loading: boolean;
	user: User;
	error: string | null;
}
interface AuthAction {
	type:
		| 'REGISTER_SUCCESS'
		| 'REGISTER_FAIL'
		| 'CLEAR_ERROR'
		| 'USER_LOADED'
		| 'AUTH_ERROR'
		| 'LOGIN_SUCCESS'
		| 'LOGIN_FAIL'
		| 'LOGOUT'
		| 'SET_ERROR';
	payload?: any;
}

export const defaultAuthState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: false,
	user: null,
	error: null,
};

const AuthReducer = (state: IState, action: AuthAction) => {
	switch (action.type) {
		case 'USER_LOADED':
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			};
		case 'REGISTER_SUCCESS':
		case 'LOGIN_SUCCESS':
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				error: null,
				isAuthenticated: true,
				loading: false,
			};
		case 'REGISTER_FAIL':
		case 'LOGIN_FAIL':
		case 'AUTH_ERROR':
		case 'LOGOUT':
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};
		case 'SET_ERROR':
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default AuthReducer;
