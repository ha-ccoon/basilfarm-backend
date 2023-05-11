import express from 'express';
import signIn from '../controller/user/sign-in.js';
import loginAuth from '../middleware/loginAuth.js';
import signUpUser from '../controller/user/sign-up.js';
import { userInfo } from '../controller/user/user-db.js';

const router = express.Router();

router.post('/sign_in', signIn);

// 유저 정보
router.get('/sign_in/page', loginAuth, userInfo);
router.post('/logout');
router.post('/sign_up', signUpUser);

// router.get('/sign_in', (req, res) => {
//   res.render('check');
// });

export default router;