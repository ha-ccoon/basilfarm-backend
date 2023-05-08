import express from 'express';
import {
  getActuatorData,
  getActuatorDataByDeviceId,
} from '../controller/actuatorController.js';

const actuatorRouter = express.Router();

actuatorRouter.get('/', getActuatorData);
actuatorRouter.get('/:device_id', getActuatorDataByDeviceId);
actuatorRouter.post('/:device_id/pump/');
actuatorRouter.post('/:device_id/led/');
actuatorRouter.post('/:device_id/fan/');

export default actuatorRouter;
