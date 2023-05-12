import express from 'express';
const router = express.Router();

import actuatorRouter from './actuator.js';
import sensorRouter from './sensor.js';
import userRouter from './user.js';
import autoRouter from './auto.js';

router.use('/sensors', sensorRouter);
router.use('/actuators', actuatorRouter);
router.use('/user', userRouter);
router.use('/auto', autoRouter);

export default router;