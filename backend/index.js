require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

const routerProduct = require("./routes/productRoute");
const userRoutes = require("./routes/userRoutes");
const routerUpload = require("./routes/uploadRoute");

app.use("/product", routerProduct);
app.use("/user", userRoutes);
app.use("/upload", routerUpload);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
	res.json({ message: "Server is running" });
});

const connectDB = require("./config/db");

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running ${PORT}`);
	});
});
