import express from 'express';
import signInUser from '../controller/users/sign-in.js';
import signUpUser from '../controller/users/sign-up.js';
import { getUserInfo } from '../controller/users/users.js';
import { verifySignInStatus } from '../middleware/verify-authentication.js';

const router = express.Router();

// 회원 가입
router.post('/sign_up', signUpUser);

// 로그인
router.post('/sign_in', signInUser);

// 유저 정보
router.route('/sign_in/info').get(verifySignInStatus, getUserInfo);
// .put(verifySignInStatus, updateUser);

export default router;
