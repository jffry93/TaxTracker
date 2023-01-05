const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		nickname: {
			type: String,
		},
		name: {
			type: String,
		},
		picture: {
			type: String,
		},
		updated_at: {
			type: String,
		},
		email: {
			type: String,
		},
		email_verified: {
			type: Boolean,
		},
		sub: {
			type: String,
		},
		location: {
			type: String,
		},
		lightTheme: {
			type: Boolean,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
