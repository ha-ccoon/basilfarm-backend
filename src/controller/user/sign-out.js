import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const signOut = async (req, res, next) => {
  res.clearCookie('accessToken');
  res.status(200).json({ message: '로그아웃 되었습니다.' });
};

export default signOut;
