import express from 'express';
import {
  saveAutoStatus,
  autoManagement,
  currentAutoManagementStatus,
} from '../controller/auto.js';

const router = express.Router();

router.post('/:device_id', saveAutoStatus, autoManagement);
router.get('/:device_id/status', currentAutoManagementStatus);

export default router;
