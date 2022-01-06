interface IState {
	token: string | null;
	isAuthenticated: boolean | null;
	loading: boolean;
	user: any;
	error: string | null;
}
interface AuthAction {
	type: 'REGISTER_SUCCESS' | 'REGISTER_FAIL';
	payload: any;
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
			localStorage.removeItem('token');
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
