const { string, bool, number } = require("joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			require: [true, "The Email is required"],
			unique: [true, "This Email has been registerd before"],
			trim: true,
			minLength: [10, "Email must contain more than 10 letters "],
			lowercase: true,
		},
		password: {
			type: String,
			require: [true, "The password is required "],
			minLength: [8, "The password must contain more than 8 letters"],
			trim: true,
		},
		verified: {
			type: Boolean,
			select: false,
			default: false,
		},
		verificationCode: {
			type: String,
			select: false,
		},
		verificationCodeValidation: {
			type: Number,
			select: false,
		},
		forgetPasswordCode: {
			type: String,
			select: false,
		},
		forgetPasswordCodeValidation: {
			type: Number,
			select: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", userSchema);
