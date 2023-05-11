import express from 'express';
import { getSensorData, getSensorDataByDeviceId } from '../controller/sensorController.js';

const sensorRouter = express.Router();
sensorRouter.get('/', getSensorData);
sensorRouter.get('/:device_id', getSensorDataByDeviceId);


export default sensorRouter;