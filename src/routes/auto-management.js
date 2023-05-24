import express from 'express';
import {
  saveAutoStatus,
  autoCommand,
  updateRealTimeAutoStatus,
} from '../controller/auto-management.js';

const router = express.Router();

// 시스템 자동 명령
router.post('/:device_id', saveAutoStatus, autoCommand);

// 자동 명령어 전송
router.get('/:device_id/status', updateRealTimeAutoStatus);

export default router;
