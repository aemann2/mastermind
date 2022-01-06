import { Request, Response } from 'express';

const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: './config/.env' });
const db = require('./config/db');
const signup = require('./routes/signup');
const auth = require('./routes/auth');
const scores = require('./routes/scores');

const app = express();
app.use(cors());
const PORT: String | Number = process.env.PORT || 5000;

// body parser middleware
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

// Routes
app.use('/api/signup', signup);
app.use('/api/auth', auth);
app.use('/api/scores', scores);

// Connecting to DB
db();

if (process.env.NODE_ENV === 'production') {
	// setting the static folder for the deployment
	app.use(express.static('client/build'));
	app.get('*', (req: Request, res: Response) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	);
}

// Server setup
app.listen(PORT, () => {
	console.log(`The application is listening on port ${PORT}`);
});
