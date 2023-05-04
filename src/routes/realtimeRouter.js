import express from 'express';
import { getRealtimeDataByDeviceId } from '../controller/realtimeController.js';

const RealtimeRouter = express.Router();
RealtimeRouter.get('/:device_id', getRealtimeDataByDeviceId);

export default RealtimeRouter;