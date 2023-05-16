import express from 'express';
import getDeviceInfo from '../controller/device.js';

const router = express.Router();

// 디바이스 정보 입력
router.get('/info', getDeviceInfo);

export default router;
