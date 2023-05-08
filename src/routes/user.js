import express from 'express';
import login from '../controller/user/login.js';

import loginAuth from '../middleware/loginAuth.js';

const router = express.Router();

router.post('/login', loginAuth, login);
router.get('/accessToken');
router.get('/refreshToken');
router.get('/login/success');
router.post('/logout');

router.post('/register');

export default router;