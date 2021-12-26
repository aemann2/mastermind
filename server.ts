import { Request, Response } from 'express';

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: './config/.env' });
const db = require('./config/db');
const auth = require('./routes/auth');
const scores = require('./routes/scores');

const app = express();
const PORT: String | Number = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
	// setting the static folder for the deployment
	app.use(express.static('client/build'));
	app.get('*', (req: Request, res: Response) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	);
}

// body parser middleware
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use('/auth', auth);
app.use('/scores', scores);

// Connecting to DB
db();

app.get('/api', (req: Request, res: Response) => {
	res.send('Hello world!');
});

// Server setup
app.listen(PORT, () => {
	console.log(`The application is listening on port http://localhost: ${PORT}`);
});
