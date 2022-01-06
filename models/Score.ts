// fixes 'cannot redeclare block scoped variable' TS error
export {};
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScoreSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
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
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Score', ScoreSchema);
