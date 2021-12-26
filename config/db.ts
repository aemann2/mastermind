const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error: any) {
		console.log(`Error ${error.message}`);
		process.exit(1);
	}
};

module.exports = db;
