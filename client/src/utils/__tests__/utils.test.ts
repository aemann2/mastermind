import { compareSequence } from '../utils';

describe('Tests for compareSequence function', () => {
	test('Correctly returns no matches', () => {
		const result = compareSequence([1, 2, 3, 4], [5, 6, 7, 8]);
		expect(result).toStrictEqual({ N: 0, L: 0 });
	});
	test('Correctly returns L matches', () => {
		const result = compareSequence([1, 2, 3, 4], [1, 2, 7, 8]);
		expect(result).toStrictEqual({ N: 0, L: 2 });
	});
	test('Correctly returns R matches', () => {
		const result = compareSequence([7, 8, 3, 4], [1, 2, 7, 8]);
		expect(result).toStrictEqual({ N: 2, L: 0 });
	});
	test('Works with both N and L matches', () => {
		const result = compareSequence([1, 2, 3, 4], [1, 2, 4, 3]);
		console.log(result);
		expect(result).toStrictEqual({ N: 2, L: 2 });
	});
	test('Works with all L matches', () => {
		const result = compareSequence([1, 1, 1, 1], [1, 1, 1, 1]);
		expect(result).toStrictEqual({ N: 0, L: 4 });
	});
	test('Works with all N matches', () => {
		const result = compareSequence([1, 2, 3, 4], [4, 3, 2, 1]);
		expect(result).toStrictEqual({ N: 4, L: 0 });
	});
	test('Works correctly with zeros', () => {
		const result = compareSequence([0, 0, 3, 4], [0, 0, 7, 8]);
		expect(result).toStrictEqual({ N: 0, L: 2 });
	});
});
