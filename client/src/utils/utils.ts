export const compareSequence = (entry: String, sequence: String) => {
	// A number was correct, but not its location
	let N = 0;
	// A number and its location was correct
	let L = 0;
	const split = entry.split('');
	for (let i = 0; i < split.length; i++) {
		if (split[i] === sequence[i]) {
			L++;
		} else if (sequence.includes(split[i])) {
			N++;
		}
	}
	return { N, L };
};
