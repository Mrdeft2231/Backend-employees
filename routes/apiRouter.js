// Проводник между всеми роутами

const apiRuoter = require("express").Router();

const userRouter = require("../routes/user");
const employeeRoute = require('../routes/employee')
const machineRoute = require('../routes/machine')
const scheduleRouter = require('../routes/schedule')

apiRuoter.use("/api", userRouter);
apiRuoter.use("/api", employeeRoute);
apiRuoter.use("/api", machineRoute);
apiRuoter.use("/api", scheduleRouter);
module.exports = apiRuoter;