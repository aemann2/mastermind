// fixes 'cannot redeclare block scoped variable' TS error
export {};
const mongoose = require('mongoose');
const { Schema } = mongoose;

const scoreSchema = new Schema({
	sequence: {
		type: Number,
		required: true,
	},
	guesses: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('Score', scoreSchema);
