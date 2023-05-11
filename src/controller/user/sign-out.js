import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const signOut = async (req, res, next) => {
  try {
    res.clearCookie('accessToken');
    res.status(200).json({ message: '로그아웃 되었습니다.' });
  } catch (err) {
    next();
  }
};

export default signOut;
