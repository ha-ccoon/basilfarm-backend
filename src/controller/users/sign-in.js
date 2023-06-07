import jwt from 'jsonwebtoken';
import { findById, findByPassword } from './users.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const signInUser = async (req, res, next) => {
  const { id, password } = req.body;

  // 아이디 확인
  const existedId = await findById(id);
  console.log('데이터베이스 아이디', existedId);
  const confirmId = existedId.find((data) => {
    return id === data.id;
  });

  if (!confirmId) {
    res.status(403).json({ message: 'Incorrect Id' });
    next();
  }

  // 비밀번호 확인
  const existedPassword = await findByPassword(id);
  const takeoutPassword = existedPassword.find((data) => {
    return data.password;
  });

  const comparePassword = bcrypt.compareSync(
    password,
    takeoutPassword.password
  );

  if (comparePassword === false) {
    res.status(403).json({ message: 'Incorrect Password' });
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

    const refreshToken = jwt.sign(
      {
        id: confirmId.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_EXPIRES_IN,
        issuer: 'basilfarm',
      }
    );

    res
      .status(200)
      .json({ message: 'Sign In Succeed', accessToken, refreshToken });
  } catch (err) {
    res.status(401).json({ message: 'Sign In Failed' });
    next();
  }
};

export default signInUser;
