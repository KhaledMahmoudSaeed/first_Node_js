const { hash, compare } = require("bcryptjs");
const createHmac = require("crypto");
dohash = (value, saltvalue) => {
	const resulte = hash(value, saltvalue);
	return resulte;
};

hashValidation = (password, checked) => {
	const result = compare(password, checked);
	return result;
};

hmacProcess = (value, key) => {
	const result = createHmac("sha256", key).upate(value).digest("hex");
	return result;
};
module.exports = { dohash, hashValidation, hmacProcess };
