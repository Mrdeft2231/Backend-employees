const apiRuoter = require("express").Router();

const userRouter = require("../routes/user");
const employeeRoute = require('../routes/employee')

apiRuoter.use("/api", userRouter);
apiRuoter.use("/api", employeeRoute);
module.exports = apiRuoter;