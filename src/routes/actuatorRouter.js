import express from 'express';
import { 
  getActuatorData,
  getActuatorDataByDeviceId,
} from '../controller/actuatorController.js';

const actuatorRouter = express.Router();

actuatorRouter.get('/', getActuatorData);
actuatorRouter.get('/:device_id', getActuatorDataByDeviceId);
actuatorRouter.post('/pump/:device_id');
actuatorRouter.post('/led/:device_id');
actuatorRouter.post('/fan/:device_id');

export default actuatorRouter;