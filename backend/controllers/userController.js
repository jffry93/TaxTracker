const User = require('../models/userModel');
// const mongoose = require('mongoose');

//ADD USER
const legitCheckUser = async (req, res) => {
	try {
		const { email } = req.body;
		console.log(req.body);
		let user = await User.find({ email });
		// console.log('exists', user);

		if (user.length === 0) {
			user = await User.create({
				...req.body,
				lightTheme: false,
			});
			// console.log('new', user);

			res.status(200).json({ status: 200, msg: 'Welcome...😈', user });
		} else {
			res
				.status(409)
				.json({ status: 409, msg: 'User exists dumbass🤪', user: user[0] });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ status: 200, msg: 'oof...🤕', user });
	}
};
//UPDATE USER
const updateUser = async (req, res) => {
	const { email } = req.body;
	// if (!mongoose.Types.ObjectId.isValid(id)) {
	// 	return res.status(404).json({ error: 'No such payment' });
	// }

	const user = await User.findOneAndUpdate(
		{ email: email },

		{ ...req.body },
		{
			new: true,
		}
	);

	if (!user) {
		return res.status(404).json({ error: 'No such User' });
	}
	res.status(200).json(user);
};

module.exports = { legitCheckUser, updateUser };
