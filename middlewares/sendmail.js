const mailer = require("nodemailer");
const transport = mailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.NODE_SENDING_MAIL_ADDRESS,
		pass: process.env.NODE_SENDING_MAIL_PASSWORD,
	},
});
module.exports = transport;
