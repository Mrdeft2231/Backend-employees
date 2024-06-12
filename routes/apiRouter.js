const apiRoter = require("express").Router();

const userRouter = require("../routes/user");

apiRoter.use("/api", userRouter);

module.exports = apiRoter;