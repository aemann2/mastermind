export {};
import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

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
router.post(
	'/',
	[
		auth,
		[
			check('sequence', 'Sequence is required').not().isEmpty(),
			check('guesses', 'Guesses is required').not().isEmpty(),
			check('solved', 'Solved is required').not().isEmpty(),
		],
	],
	async (req: IGetUserAuthInfoRequest, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}

		const { sequence, time, guesses, solved } = req.body;

		try {
			let sequenceString = sequence.join('');

			const newScore = new Score({
				user: req.user.id,
				sequence: sequenceString,
				time: time,
				guesses: guesses,
				solved: solved,
			});

			const score = await newScore.save();

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
	}
);

module.exports = router;
