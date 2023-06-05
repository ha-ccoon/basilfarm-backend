import express from 'express';
import {
  getActuatorData,
  getActuatorDataByDeviceId,
} from '../controller/actuators.js';

const router = express.Router();

// 엑츄에이터 기록 조회
router.get('/', getActuatorData);

// 디바이스 당 엑츄에이터 기록 조회
router.get('/:device_id', getActuatorDataByDeviceId);

export default router;
