export {};
import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');

// TS type for req.user
interface IGetUserAuthInfoRequest extends Request {
	user: {
		id: string;
	};
}

// TS type for error message
interface IProps {
	message: string;
}

// @route			GET api/auth
// @desc			Get logged in user
// @access		Private
router.get('/', auth, async (req: IGetUserAuthInfoRequest, res: Response) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err: unknown) {
		const e = err as IProps;
		console.error(e.message);
		return res.status(500).send('Server Error');
	}
});

// @route			POST api/auth
// @desc			Authenticate a user
// @access		Public
router.post(
	'/',
	[
		check('email', 'Email is required').isEmail(),
		check('password', 'Please enter a 6+ character password').isLength({
			min: 6,
		}),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email: email });

			if (!user) {
				return res.status(400).json({
					message: 'This email is not associated with a user',
				});
			}

			const match = await bcrypt.compare(password, user.password);

			if (!match) {
				return res.status(400).json({
					message: 'Invalid password',
				});
			}

			const token = jwt.sign(
				{
					user: {
						id: user.id,
					},
				},
				process.env.JWT_SECRET,
				{
					expiresIn: 3600,
				}
			);

			return res.status(201).json({ status: 'Login successful', token });
		} catch (err: unknown) {
			const e = err as IProps;
			console.error(e.message);
			return res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
