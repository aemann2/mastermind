import { rest } from 'msw';

export const handlers = [
	rest.get('https://www.random.org', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				data: '1\n2\n3\n4\n',
			})
		);
	}),
];
