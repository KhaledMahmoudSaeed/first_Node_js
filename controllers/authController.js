const {
	signupSchema,
	signinSchema,
	createPostSchema,
} = require("../middlewares/validator");
const jwt = require("jsonwebtoken");
const { dohash, hashValidation } = require("../utils/hashing");
const User = require("../models/userModel");
const transport = require("../middlewares/sendmail");

exports.signup = async (req, res) => {
	const { email, password } = req.body;
	try {
		const { error, value } = signupSchema.validate({ email, password });
		if (error) {
			return res.status(401).json({
				success: false,
				message: "Can not sign up because: " + error.details[0].message,
			});
		}
		const exsitsUser = await User.findOne({ email });
		if (exsitsUser) {
			return res.status(409).json({
				success: false,
				message: "User is already exists",
			});
		}
		const hashedPassword = await dohash(password, 12);

		const user = new User({
			email,
			password: hashedPassword,
		});
		const result = await user.save();
		result.password = undefined;
		res.status(201).json({
			success: true,
			message: "User has been created Successfully",
		});
	} catch (error) {
		console.log("sign Up error   " + error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

exports.signin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const { error, value } = signinSchema.validate({ email, password });
		if (error) {
			return res.status(401).json({
				success: false,
				message: "Can not sign in because: " + error.details[0].message,
			});
		}
		const exsitsUser = await User.findOne({ email }).select("+password");
		if (!exsitsUser) {
			return res.status(200).json({
				success: false,
				message: "User Not exists",
			});
		}
		const result = await hashValidation(password, exsitsUser.password);
		if (result) {
			const token = jwt.sign(
				{
					userId: exsitsUser.id,
					email: exsitsUser.email,
					verfied: exsitsUser.verfied,
				},
				process.env.SECRET_KEY,
				{
					expiresIn: "8h",
				}
			);
			res
				.cookie("Authorization", "Bearer" + token, {
					expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
					httpOnly: process.env.NODE_ENV === "production",
					secure: process.env.NODE_ENV === "production",
				})
				.status(200)
				.json({
					success: true,
					token: token,
					message: "User Logged In Successfully ",
				});
		} else {
			return res.status(200).json({
				success: false,
				message: "User Can't Logged In Successfully ",
			});
		}
	} catch (error) {
		console.log("sign Up error   " + error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

exports.signout = async (req, res) => {
	res.clearCookie("Authorization").status(200).json({
		success: true,
		message: "Logged out Successfully",
	});
};
exports.sendVerificationCode = async (req, res) => {
	const email = req.body;
	try {
		const user = await User.findOne(email);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User Not exists",
			});
		}
		if (user.verfied) {
			return res.status(200).json({
				success: true,
				message: "User has already verfied",
			});
		}
		const verificationCode = math.floor(math.random() * 100000).toString();
		let info = await transport.sendMail({
			from: process.env.NODE_SENDING_MAIL_ADDRESS,
			to: user.email,
			subject: "verification Code",
			html: "<h1>" + verificationCode + "</h1>",
		});
		if (info.accepted[0] === user.email) {
			const hashcode = hmacProcess(
				verificationCode,
				process.env.HMAC_VERIFICATION_CODE_SECRET
			);
			user.verificationCode = hashcode;
			user.verificationCodeValidation = Date.now();
			await user.save();
			return res.status(200).json({ message: "code has been sent " });
		}
	} catch (error) {
		console.log("Can't send code to this email " + error);
	}
};
