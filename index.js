const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("Successfully connected");
	})
	.catch((error) => {
		console.log("Connection Failed" + "  00000000  " + error);
	});
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

app.get("/", (req, res) => {
	res.send({ message: "first one" });
});

app.listen(process.env.PORT, () => {
	console.log("I am listing");
});
