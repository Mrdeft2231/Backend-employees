const userRouter = require("express").Router();


userRouter.post('user', (user) => {
  console.log(user)
})