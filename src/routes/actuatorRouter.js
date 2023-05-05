import express from 'express';
import { 
  getActuatorData,
  getActuatorDataByDeviceId,
  postPumpData,
  postLedData,
  postFanData
} from '../controller/actuatorController.js';


const actuatorRouter = express.Router();

actuatorRouter.get('/', getActuatorData);
actuatorRouter.get('/:device_id', getActuatorDataByDeviceId);
actuatorRouter.post('/pump/:device_id', postPumpData);
actuatorRouter.post('/led/:device_id', postLedData);
actuatorRouter.post('/fan/:device_id', postFanData);

export default actuatorRouter;