interface IState {
	token: string | null;
	isAuthenticated: boolean | null;
	loading: boolean;
	user: any;
	error: string | null;
}
interface AuthAction {
	type:
		| 'REGISTER_SUCCESS'
		| 'REGISTER_FAIL'
		| 'CLEAR_ERROR'
		| 'USER_LOADED'
		| 'AUTH_ERROR'
		| 'LOGIN_FAIL';
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
			// FIXME:
			//@ts-ignore
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				// FIXME:
				//@ts-ignore
				...action.payload,
				isAuthenticated: true,
			};
		case 'REGISTER_FAIL':
		case 'LOGIN_FAIL':
		case 'AUTH_ERROR':
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};
		// case 'CLEAR_ERROR':
		// 	return {
		// 		...state,
		// 		error: null,
		// 	};
		default:
			return state;
	}
};

export default AuthReducer;
