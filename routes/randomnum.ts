export {};
import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();

interface CustomQuery extends Request {
	query: {
		len: string;
	};
}

// @route			GET api/randomnum
// @desc			Get random number
// @access		Public
router.get('/', async (req: CustomQuery, res: Response) => {
	function getRandomInt(min: number, max: number) {
		return Math.floor(Math.random() * (Math.ceil(max) - Math.ceil(min)) + min);
	}

	// checking if param exists. if not, set default number length to '4'
	let { len } = req.query;
	if (!len) len = '4';
	const lenInt = parseInt(len);

	if (lenInt < 4 || lenInt > 6 || isNaN(lenInt)) {
		return res.status(400).json({
			message: 'len param must be a number between 4 and 6',
		});
	}

	let numArr = [];
	for (let i = 0; i < lenInt; i++) {
		const randomNum = getRandomInt(0, 8);
		numArr.push(randomNum);
	}

	return res.status(200).json({
		number: numArr,
	});
});

module.exports = router;
