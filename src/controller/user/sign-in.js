import jwt from 'jsonwebtoken';
import { findUser } from './user.js';
import dotenv from 'dotenv';
dotenv.config();

const signIn = async (req, res, next) => {
  const { id } = req.body;

  // DB에 로그인 정보 확인
  const existedId = await findUser(id);
  const confirmId = existedId.find((data) => {
    return id === data.id;
  });

  if (!confirmId) {
    res.status(403).json({ message: '존재 하지 않는 아이디입니다.' });
    next();
  }

  try {
    console.log('유저 아이디: ', confirmId.id);
    const issueAccessToken = jwt.sign(
      {
        id: confirmId.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_EXPIRES_IN,
        issuer: 'basilfarm',
      }
    );

    const issueRefreshToken = jwt.sign(
      {
        id: confirmId.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_EXPIRES_IN,
        issuer: 'basilfarm',
      }
    );

    res.cookie('accessToken', issueAccessToken, {
      httpOnly: true,
      secure: false,
    });

    res.cookie('refreshToken', issueRefreshToken, {
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({ message: '로그인에 성공하였습니다.' });
  } catch (err) {
    res.status(401).json({ message: '로그인에 실패하였습니다.' });
    next();
  }
};

export default signIn;
