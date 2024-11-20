const { string, number, required } = require("joi");
const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
	{
		title: {
			type: String,
			require: [true, "The title is required"],
			trim: true,
			unique: true,
		},
		descripton: {
			type: String,
			require: [true, "The description is required "],
			trim: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			// required:true
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Post", postSchema);
