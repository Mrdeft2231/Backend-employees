const userRouter = require("express").Router();
const upload = require('../multer/multer')

const findAllUsers = require('../middlewares/user')
const sendAllUsers = require('../controllers/user')

userRouter.get('/user', findAllUsers, sendAllUsers)
userRouter.post('/user', upload.any(), )

module.exports = userRouter;
