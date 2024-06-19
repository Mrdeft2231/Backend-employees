const scheduleRouter = require('express').Router();

const {
  upload
} = require('../multer/multer')

const {
  findAllSchedule,
  createSchedule
} = require('../middlewares/schedule');

const {
  sendAllSchedule,
  sendScheduleCreated
} = require('../controllers/schedule')

scheduleRouter.get('/schedule', findAllSchedule, sendAllSchedule)
scheduleRouter.post('/schedule', upload.any(), findAllSchedule, createSchedule, sendScheduleCreated )

module.exports = scheduleRouter;