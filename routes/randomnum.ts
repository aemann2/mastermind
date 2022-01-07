export {};
import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();

// @route			GET api/randomnum
// @desc			Get random number
// @access		Public
router.get('/', async (req: Request, res: Response) => {
	function getRandomInt() {
		const min = Math.ceil(0);
		const max = Math.floor(8);
		return Math.floor(Math.random() * (max - min) + min);
	}

	let numArr = [];
	for (let i = 0; i < 4; i++) {
		const randomNum = getRandomInt();
		numArr.push(randomNum);
	}

	return res.status(200).json({
		number: numArr,
	});
});

module.exports = router;
