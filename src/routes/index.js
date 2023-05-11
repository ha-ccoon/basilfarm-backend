import express from 'express';
const router = express.Router();

import actuatorRouter from './actuator.js';
import sensorRouter from './sensor.js';
import userRouter from './user.js';
import commandRouter from './command.js';

router.use('/sensors', sensorRouter);
router.use('/actuators', actuatorRouter);
router.use('/user', userRouter);
router.use('/command', commandRouter);

export default router;
