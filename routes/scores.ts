export {};
import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Score = require('../models/Score');

interface IGetUserAuthInfoRequest extends Request {
	user: {
		id: string;
	};
}

// @route			GET api/scores
// @desc			Get scores
// @access		Private
router.get('/', auth, async (req: IGetUserAuthInfoRequest, res: Response) => {
	try {
		const scores = await Score.find({ user: req.user.id }).sort({ date: -1 });

		return res.status(200).json({
			success: true,
			count: scores.length,
			data: scores,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: err,
		});
	}
});

// @route			POST api/scores
// @desc			Post score
// @access		Private
router.post('/', async (req: Request, res: Response) => {
	try {
		const { sequence, guesses, solved } = req.body;

		let sequenceString = sequence.join('');

		const score = await Score.create({
			sequence: sequenceString,
			guesses: guesses,
			solved: solved,
		});

		return res.status(201).json({
			success: true,
			data: score,
		});
	} catch (err: any) {
		return res.status(500).json({
			success: false,
			error: err,
		});
	}
});

module.exports = router;
