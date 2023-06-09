import express from 'express';
import getDeviceInfo from '../controller/devices.js';

const router = express.Router();

// 디바이스 정보 조회
router.get('/:device_id', getDeviceInfo);

export default router;
