import axios from 'axios';

export const compareSequence = (entry: number[], sequence: number[]) => {
	// A number was correct, but not its location
	let N = 0;
	// A number and its location was correct
	let L = 0;
	for (let i = 0; i < sequence.length; i++) {
		if (entry[i] === sequence[i]) {
			L++;
		} else if (sequence.includes(entry[i])) {
			N++;
		}
	}
	return { N, L };
};

export const digitCheck = (value: number) => {
	if (value > 7 || value < 0) {
		return false;
	}
	if (isNaN(value)) return false;
	return true;
};

export const setAuthToken = (token: string) => {
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
};
