const generateToken = require("../config/generateToken");
const User = require("../Models/usersModel");
const argon2 = require("argon2");

const Register = async (req, res) => {
	const { name, email, password, pic } = req.body;
	const hash = await argon2.hash(password);
	const userExist = await User.findOne({ email });
	try {
		if (!userExist) {
			let data = await User.create({ name, email, password: hash, pic });
			return res.status(201).json({
				_id: data._id,
				name: data.name,
				email: data.email,
				pic: data.pic,
				token: generateToken(data._id),
			});
		}
		return res.status(404).json({ message: "User Already exist" });
	} catch (err) {
		return res.status(400).json({ message: "Failed to Create the User" });
	}
};

const LoginAuth = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	try {
		if (user && (await argon2.verify(user.password, password))) {
			return res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				pic: user.pic,
				token: generateToken(user._id),
			});
		} else {
			return res.status(401).send("INVALID CREDENTIALS");
		}
	} catch (err) {
		return res.status(400).json({ message: "Failed to login User" });
	}
};

///api/user?search=vinayak
const SearchResult = async (req, res) => {
	const keyword = req.query.search
		? {
				$or: [
					{ name: { $regex: req.query.search, $options: "i" } },
					{ email: { $regex: req.query.search, $options: "i" } },
				],
		  }
		: {}; //here we are getting req.id from middleware...
	const users = await User.find(keyword).find({ _id: { $ne: req.id } }); //here we are finding the all the search user except login user that's why we passing condition $ne means not equal to..
	res.send(users);
};

module.exports = { Register, LoginAuth, SearchResult };
