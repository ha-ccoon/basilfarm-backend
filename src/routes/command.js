import express from 'express';
import { commandCallback } from '../controller/command.js';

const router = express.Router();

router.post('/cmd/:device_id', commandCallback);

export default router;
