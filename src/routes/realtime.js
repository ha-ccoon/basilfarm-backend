import express from 'express';
import { getRealtimeDataByDeviceID } from '../controller/realtime.js';

const router = express.Router();
router.get('/:device_id', getRealtimeDataByDeviceID);

export default router;