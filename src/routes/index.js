import express from 'express';
import actuator from './actuator.js';
import sensor from './sensor.js';
import user from './user.js';

const router = express.Router();

router.use('/sensors', sensor);
router.use('/actuators', actuator);
router.use('/actuators/pump', actuator);
router.use('/actuators/led', actuator);
router.use('/actuators/fan', actuator);
router.use('/user', user);

export default router;