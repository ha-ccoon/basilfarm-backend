import express from 'express';
import login from '../controller/user/loginController.js';

import loginAuth from '../middleware/loginAuth.js';

const userRouter = express.Router();

userRouter.post('/login', loginAuth, login);
userRouter.get('/accessToken');
userRouter.get('/refreshToken');
userRouter.get('/login/success');
userRouter.post('/logout');

userRouter.post('/register');

export default userRouter;
