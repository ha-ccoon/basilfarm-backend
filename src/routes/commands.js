import express from 'express';
import manualCommand from '../controller/commands.js';

const router = express.Router();

// 시스템 수동 명령
router.post('/:device_id', manualCommand);

export default router;
