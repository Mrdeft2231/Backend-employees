const userRouter = require("express").Router();

const find = require("../middlewares/user")

userRouter.post('/user', find)

module.exports = userRouter;