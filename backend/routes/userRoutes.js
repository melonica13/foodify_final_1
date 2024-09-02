const express = require("express");
const userRoutes = express.Router();

const signinUser = require("../controllers/user/signinUser");
const signupUser = require("../controllers/user/signupUser");
const { auth } = require("../middleware/auth");
const { userDetails } = require("../controllers/user/userDetails");

userRoutes.post("/signin", signinUser);
userRoutes.post("/signup", signupUser);

userRoutes.get("/userDetails", auth, userDetails);

module.exports = userRoutes;
