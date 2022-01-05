export {};
import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../models/User');

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

router.post(
	'/',
	[
		check('email', 'Email is required').isEmail(),
		check('password', 'Please enter a 6+ character password').isLength({
			min: 6,
		}),
	],
	(req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}
		res.send('passed');
	}
);

module.exports = router;
