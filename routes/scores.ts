export {};
import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

router.get('/', async (req: Request, res: Response) => {
	try {
		const scores = await Score.find();

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

router.post('/', async (req: Request, res: Response) => {
	try {
		const { sequence, guesses } = req.body;

		const score = await Score.create({
			sequence,
			guesses,
		});

		return res.status(201).json({
			success: true,
			data: score,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: err,
		});
	}
});

module.exports = router;
