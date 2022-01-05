export {};
import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// TS type for error message
interface IProps {
	message: string;
}

router.get('/', async (req: Request, res: Response) => {
	try {
		const user = await User.find();

		return res.status(200).json({
			success: true,
			count: user.length,
			data: user,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: err,
		});
	}
});

// @route			POST api/auth
// @desc			Register a user
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

			if (user) {
				return res.status(400).json({
					message: 'This user already exists',
				});
			}

			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			user = new User({
				email: email,
				password: hash,
			});

			await user.save();

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

			return res.status(201).json({ status: 'Account created', token });
		} catch (err: unknown) {
			const e = err as IProps;
			console.error(e.message);
			return res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
