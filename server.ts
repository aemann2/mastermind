import { Request, Response } from 'express';
const express = require('express');

const app = express();
const PORT: Number = 5000;

// Handling GET / Request
app.get('/api', (req: Request, res: Response) => {
	res.send('Hello world!');
});

// Server setup
app.listen(PORT, () => {
	console.log(
		'The application is listening ' + 'on port http://localhost:' + PORT
	);
});
