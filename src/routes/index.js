import express from 'express';

const router = express.Router();

import actuatorRouter from './actuators.js';
import sensorRouter from './sensors.js';
import userRouter from './users.js';
import autoRouter from './auto-management.js';
import commandRouter from './commands.js';
import deviceRouter from './devices.js';

router.use('/sensors', sensorRouter);
router.use('/actuators', actuatorRouter);
router.use('/users', userRouter);
router.use('/autos', autoRouter);
router.use('/commands', commandRouter);
router.use('/devices', deviceRouter);

export default router;
