import { Request, Response } from 'express';
const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
const db = require('./config/db');

const app = express();
const PORT: String | Number = process.env.PORT || 5000;

db();

app.get('/api', (req: Request, res: Response) => {
	res.send('Hello world!');
});

// Server setup
app.listen(PORT, () => {
	console.log(`The application is listening on port http://localhost: ${PORT}`);
});
