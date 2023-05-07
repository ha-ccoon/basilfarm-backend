import express from 'express';
import { commandCallback } from '../controller/commandController.js';

const router = express.Router();

router.post('/cmd/:device_id', commandCallback);
