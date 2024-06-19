// В роутах можно манипулировать мидделварами в любом порядке как мы хотим а так же это маршут где принимаются данные

const userRouter = require("express").Router();
const {
  upload,
  uploadPhoto
} = require('../multer/multer')

const {
    findAllUsers,
    createUser
} = require('../middlewares/user')
const {
    sendAllUsers,
    sendUserCreated
} = require('../controllers/user')

userRouter.get('/user', findAllUsers, sendAllUsers)
userRouter.post('/user', upload.any(), findAllUsers, createUser, sendUserCreated )

module.exports = userRouter;
