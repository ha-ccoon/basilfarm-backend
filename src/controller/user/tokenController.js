import jwt from 'jsonwebtoken';
import userInfo from './loginController.js';

// 아직 구현 중 입니다.
const verifyAccessToken = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const verification = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const userData = db.filter((data) => {
      return data.email === verification.email;
    });
  } catch (error) {}
};
