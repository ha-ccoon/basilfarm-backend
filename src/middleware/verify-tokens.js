import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const getTokens = (req, res) => {
  // const accessToken = req.headers['authorization']?.split(' ')[1];
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    res.status(401).json({ message: 'No AccessToken Provided' });
  }

  if (!refreshToken) {
    res.status(401).json({ message: 'No RefreshToken Provided' });
  }

  return { accessToken, refreshToken };
};

export const isAccessTokenExpired = (
  accessToken,
  refreshToken,
  req,
  res,
  next
) => {
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      console.log(decoded, err);
      if (decoded) {
        req.id = decoded.id;
        next();
      } else if (err.name === 'TokenExpiredError') {
        isRefreshTokenExpired(accessToken, refreshToken, req, res);
        res.status(401).json({ message: 'AccessToken Expired' });
      } else if (err.name === 'JsonWebTokenError') {
        res.status(401).json({ message: err });
      }
    });
  } catch (err) {
    next(err);
  }
};

export const isRefreshTokenExpired = (accessToken, refreshToken, req, res) => {
  if (accessToken.id !== refreshToken.id) {
    res.status(401).json({ message: 'Unauthorized RefreshToken' });
  }
  try {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (decoded) {
          issueAccessToken(refreshToken, req, res);
        } else if (err.name === 'TokenExpiredError') {
          res.status(400).json({ message: 'RefreshToken Expired' });
        } else if (err.name === 'JsonWebTokenError') {
          res.status(401).json({ message: err });
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

export const issueAccessToken = (refreshToken, req, res) => {
  try {
    const accessToken = jwt.sign(
      {
        id: refreshToken.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_EXPIRES_IN,
        issuer: 'basilfarm',
      }
    );

    res.status(200).json({ message: 'Sign In Status Confirmed', accessToken });
  } catch (err) {
    res.status(500).json({ message: 'Issue New AccessToken Failed' });
  }
};
