const mongoose = require("mongoose");

const connect = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB Connected".green.underline.bold);
		return conn;
	} catch (error) {
		console.log("server disconnected".red.bold);
		process.exit();
	}
};

module.exports = connect;
