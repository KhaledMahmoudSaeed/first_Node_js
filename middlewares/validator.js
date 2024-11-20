const Joi = require("joi");

signupSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: ["com", "net"] } })
		.required(),
	password: Joi.string()
		.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
		.required(),
});
signinSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: ["com", "net"] } })
		.required(),
	password: Joi.string()
		.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
		.required(),
});
createPostSchema = Joi.object({
	title: Joi.string().required().max(20),
	descripton: Joi.string().required().max(600),
});
module.exports = { signupSchema, signinSchema, createPostSchema };
