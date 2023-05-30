import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifySignInStatus = (req, res, next) => {
  // accessToken 가져오기
  const accessToken = req.headers['authorization']?.split(' ')[1];
  console.log(accessToken);
  console.log(req.headers['authorization']);

  if (!accessToken) {
    res.status(401).json({ message: 'AccessToken이 존재하지 않습니다.' });
  }

  const confirmAccess = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  );

  req.id = confirmAccess.id;
  next();
};
