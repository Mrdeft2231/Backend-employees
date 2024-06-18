const apiRuoter = require("express").Router();

const userRouter = require("../routes/user");
const employeeRoute = require('../routes/employee')
const machineRoute = require('../routes/machine')

apiRuoter.use("/api", userRouter);
apiRuoter.use("/api", employeeRoute);
apiRuoter.use("/api", machineRoute)
module.exports = apiRuoter;