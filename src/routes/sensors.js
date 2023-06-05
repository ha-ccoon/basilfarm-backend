import express from 'express';
import {
  getSensorData,
  getSensorDataByDeviceId,
} from '../controller/sensors.js';

const router = express.Router();

// 센서 데이터 조회
router.get('/', getSensorData);

// 디바이스 당 센서 데이터 조회 
router.get('/:device_id', getSensorDataByDeviceId);

export default router;