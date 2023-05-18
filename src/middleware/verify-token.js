import jwt from 'jsonwebtoken';

export const verifyAccessToken = (req, res, next) => {
  const accessToken = req.headers['authorization'].split(' ')[1];

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
