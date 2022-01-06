import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

// TS type for req.user
interface IGetUserAuthInfoRequest extends Request {
	user: {
		id: string;
	};
}

module.exports = function (
	req: IGetUserAuthInfoRequest,
	res: Response,
	next: NextFunction
) {
	const token = req.header('x-auth-token');

	if (!token) {
		return res.status(401).json({
			message: 'No token, authorization denied',
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(401).json({
			message: 'Token is not valid',
		});
	}
};
