import jwt from 'jsonwebtoken';
import { verifyAccessToken } from './verify-token.js';
import dotenv from 'dotenv';
dotenv.config();

export const loginAuth = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken) {
    res.status(401).json({ message: 'AccessToken이 존재하지 않습니다.' });
    return;
  }

  const confirmAccess = () => {
    try {
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      next();
    } finally {
      return jwt.decode(accessToken);
    }
  };
};

[accessTokenDecoded, accessTokenErr] = confirmAccess();
const refreshToken = req.cookies.refreshToken;

if (accessTokenErr) {
  if (err.name === 'TokenExpiredError') {
    if (!refreshToken) {
    }
  }
}
