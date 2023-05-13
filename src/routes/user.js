import express from 'express';
import signIn from '../controller/user/sign-in.js';
import signUpUser from '../controller/user/sign-up.js';
import { userInfo } from '../controller/user/user.js';
import signOut from '../controller/user/sign-out.js';
import verifyToken from '../middleware/login-auth.js';

const router = express.Router();

// 로그인
router.post('/sign_in', signIn);

// 회원가입
router.post('/sign_up', signUpUser);

// 유저 정보
router.get('/sign_in/my_page', verifyToken, userInfo);

// 로그아웃
router.get('/sign_out', verifyToken, signOut);

export default router;
