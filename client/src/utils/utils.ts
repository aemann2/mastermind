export const compareSequence = (entry: string[], sequence: string[]) => {
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
