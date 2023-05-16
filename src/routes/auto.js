import express from 'express';
import { autoManagement, saveAutoStatus, currentAutoManagementStatus } from '../controller/auto.js';
//saveAutoStatus,

const router = express.Router();

router.post('/:device_id', autoManagement, saveAutoStatus);
router.get('/:device_id/status', currentAutoManagementStatus);

export default router;