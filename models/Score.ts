// fixes 'cannot redeclare block scoped variable' TS error
export {};
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScoreSchema = new Schema({
	score: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('User', ScoreSchema);
