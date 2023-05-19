import express from 'express';
import {
  getSensorData,
  getSensorDataByDeviceId,
} from '../controller/sensor.js';

const router = express.Router();

router.get('/', getSensorData);
router.get('/:device_id', getSensorDataByDeviceId);

export default router;
