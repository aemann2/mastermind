// fixes 'cannot redeclare block scoped variable' TS error
export {};
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScoreSchema = new Schema({
	sequence: {
		type: String,
		required: true,
	},
	guesses: {
		type: Number,
		required: true,
	},
	solved: {
		type: Boolean,
		required: true,
	},
});

module.exports = mongoose.model('Score', ScoreSchema);
