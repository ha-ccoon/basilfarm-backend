import express from 'express';

const userRouter = express.userRouter();

userRouter.post('/login', loginAuth, loginController);
userRouter.get('/accessToken', accessTokenController);
userRouter.get('/refreshToken', refreshTokenController);
userRouter.get('/login/success', SuccessController);
userRouter.post('/logout', logoutController);

userRouter.post('/register', registerController);
