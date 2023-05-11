import express from 'express';
const router = express.Router();

import actuatorRouter from './actuator.js';
import sensorRouter from './sensor.js';
import realtimeRouter from './realtime.js';
import userRouter from './user.js';

router.use('/realtime', realtimeRouter);
router.use('/sensors', sensorRouter);
router.use('/actuators', actuatorRouter);
router.use('/user', userRouter);

export default router;
