const userRouter = require("express").Router();
const multer = require('multer');

const find = require("../middlewares/user")

const upload = multer();

userRouter.post('/user', upload, find)

module.exports = userRouter;