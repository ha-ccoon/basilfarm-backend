import express from 'express';
import login from '../controller/user/sign-in.js';
import loginAuth from '../middleware/loginAuth.js';
import signUpUser from '../controller/user/sign-up.js';

const router = express.Router();

router.post('/login', loginAuth, login);
router.get('/accessToken');
router.get('/refreshToken');
router.get('/login/success');
router.post('/logout');

router.post('/register', signUpUser);

export default router;
