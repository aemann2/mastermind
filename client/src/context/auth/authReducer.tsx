interface IState {
	token: string | null;
	isAuthenticated: boolean | null;
	loading: boolean;
	user: any;
	error: string | null;
}

enum AuthActionKind {
	INCREASE = 'INCREASE',
	DECREASE = 'DECREASE',
}

interface AuthAction {
	type: AuthActionKind;
	payload: number;
}

export const defaultAuthState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: false,
	user: null,
	error: null,
};

const AuthReducer = (state: IState, action: AuthAction) => {};

export default AuthReducer;
