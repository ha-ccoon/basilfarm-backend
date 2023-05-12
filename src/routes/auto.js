import express from 'express';
import { saveAutoStatus, autoManagement, getAutoManagementStatus } from '../controller/auto.js';

const router = express.Router();

router.post('/:device_id', saveAutoStatus, autoManagement);
router.get('/:device_id/status', getAutoManagementStatus);

export default router;