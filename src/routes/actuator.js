import express from 'express';
import {
  getActuatorData,
  getActuatorDataByDeviceId,
} from '../controller/actuator.js';

export const router = express.Router();

router.get('/', getActuatorData);
router.get('/:device_id', getActuatorDataByDeviceId);
router.post('/:device_id/pump/');
router.post('/:device_id/led/');
router.post('/:device_id/fan/');

export default router;
