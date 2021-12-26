const mongoose = require('mongoose');

const db = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
		});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error: any) {
		console.log(`Error ${error.message}`);
		process.exit(1);
	}
};

module.exports = db;
