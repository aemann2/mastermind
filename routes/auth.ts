export {};
import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
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

module.exports = router;
