const {
	signupSchema,
	signinSchema,
	createPostSchema,
} = require("../middlewares/validator");

const Post = require("../models/postModel");
exports.index = async (req, res) => {
	const page = req.query;
	const postsPerPage = 10;
	try {
		let pageNum = 0;
		if (page <= 1) {
			pageNum = 0;
		} else {
			pageNum = page - 1;
		}
		const result = await Post.find()
			.sort({ createdAt: -1 })
			.skip(pageNum * postsPerPage)
			.limit(postsPerPage)
			.populate({ path: "userId", select: "email" });
		res.status(200).json({ success: true, message: "all post ", data: result });
	} catch (error) {
		console.log("Pages Error " + error);
	}
};

exports.show = async (req, res) => {
	const { _id } = req.query;
	// console.log(posttitle);
	try {
		const post = await Post.findOne({ _id });
		if (!post) {
			return res.status(404).json({
				success: false,
				message: "Can not find post because: " + error.details[0].message,
			});
		}
		res.status(200).json({ success: true, message: "The post ", data: post });
	} catch (error) {
		console.log("Pages Error " + error);
	}
};
exports.store = async (req, res) => {
	const { title, descripton, userId } = req.body;
	try {
		const { value, error } = createPostSchema.validate({ title, descripton });
		if (error) {
			return res.status(401).json({
				success: false,
				message: "Can not Create post because: " + error.details[0].message,
			});
		}
		const post = await Post.create({
			title: title,
			descripton: descripton,
			userId: userId,
		});
		return res
			.status(201)
			.json({ success: true, message: "Created Successfully", data: post });
	} catch (error) {
		console.log("create post error" + error);
	}
};
exports.update = async (req, res) => {
	const { title, descripton, userId } = req.body;
	try {
		const { value, error } = createPostSchema.validate({ title, descripton });
		if (error) {
			return res.status(401).json({
				success: false,
				message: "Can not update post because: " + error.details[0].message,
			});
		}
		const post = await Post.findOne({ userId });
		if (!post) {
			return res.status(404).json({
				success: false,
				message: "Post Not Found",
			});
		}
		post.title = title;
		post.descripton = descripton;
		const result = await post.save();
		return res
			.status(200)
			.json({ success: true, message: "Updated Successfully", data: result });
	} catch (error) {
		console.log("Update post error" + error);
	}
};

exports.delete = async (req, res) => {
	const { title, descripton, userId } = req.body;
	try {
		const post = await Post.findOne({ userId });
		if (!post) {
			return res.status(404).json({
				success: false,
				message: "Post Not Found",
			});
		}
		await post.deleteOne({ userId });
		return res
			.status(200)
			.json({ success: true, message: "Deleted Successfully" });
	} catch (error) {
		console.log("Delete post error" + error);
	}
};
