import jwt from 'jsonwebtoken';
import { findId } from './user.js';
import dotenv from 'dotenv';

dotenv.config();

const signIn = async (req, res, next) => {
  const { id } = req.body;

  // 아이디 확인
  const existedId = await findId(id);
  const confirmId = existedId.find((data) => {
    return id === data.id;
  });

  if (!confirmId) {
    res.status(403).json({ message: '존재 하지 않는 아이디입니다.' });
    next();
  }

  try {
    const accessToken = jwt.sign(
      {
        id: confirmId.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_EXPIRES_IN,
        issuer: 'basilfarm',
      }
    );

    res.status(200).json({ message: '로그인에 성공하였습니다.', accessToken });
  } catch (err) {
    res.status(401).json({ message: '로그인에 실패하였습니다.' });
    next();
  }
};

export default signIn;
