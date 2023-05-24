import express from 'express';
import signIn from '../controller/users/sign-in.js';
import signUp from '../controller/users/sign-up.js';
import { getUserInfo } from '../controller/users/user.js';
import { verifySignInStatus } from '../middleware/verify-token.js';

const router = express.Router();

// 로그인
router.post('/sign_in', signIn);

// 유저 정보
router.get('/sign_in/info', verifySignInStatus, getUserInfo);

// 회원 가입
router.post('/sign_up', signUp);

export default router;
