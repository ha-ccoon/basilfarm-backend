import jwt from 'jsonwebtoken';
import { findUser } from './user.js';
import dotenv from 'dotenv';
dotenv.config();

const signIn = async (req, res, next) => {
  const { id } = req.body;

  // DB에 로그인 정보 확인
  const existedId = await findUser(id);
  const confirmId = existedId.filter((data) => {
    return id === data.id;
  });

  if (!confirmId) {
    res.status(403).json({ message: '존재 하지 않는 아이디입니다.' });
    next();
  }

  try {
    console.log('유저 아이디: ', confirmId[0].id);
    const accessTk = jwt.sign(
      {
        id: confirmId[0].id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_EXPIRES_IN,
        issuer: 'basilfarm',
      }
    );

    const refreshTk = jwt.sign(
      {
        id: confirmId[0].id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_EXPIRES_IN,
        issuer: 'basilfarm',
      }
    );

    if (!accessTk || !refreshTk) {
      res.status(400).json({ message: '토큰이 발행되지 않았습니다.' });
      next();
    }

    res.cookie('accessToken', accessTk, {
      httpOnly: true,
      secure: false,
    });

    res.cookie('refreshToken', refreshTk, {
      httpOnly: true,
      secure: false,
    });

    // res.setHeader('Authorization', `Bearer ${accessTk}`);
    // res.setHeader('Authorization', `Bearer ${refreshTk}`);

    res.status(200).json({ message: '로그인에 성공하였습니다.' });
  } catch (err) {
    res.status(401).json({ message: '로그인에 실패하였습니다.' });
    next();
  }
};

export default signIn;
