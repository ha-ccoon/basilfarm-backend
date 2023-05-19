import express from 'express';
import {
  getActuatorData,
  getActuatorDataByDeviceId,
} from '../controller/actuator.js';

const router = express.Router();

router.get('/', getActuatorData);
router.get('/:device_id', getActuatorDataByDeviceId);

export default router;
