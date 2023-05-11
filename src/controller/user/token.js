import jwt from 'jsonwebtoken';
import router from '../../routes/index.js';
import userInfo from './login.js';

const verifyAccessToken = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const verification = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const userData = db.filter((data) => {
      return data.email === verification.email;
    });
  } catch (err) {}
};