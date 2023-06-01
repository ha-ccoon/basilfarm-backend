import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifySignInStatus = (req, res, next) => {
  // accessToken 가져오기
  const accessToken = req.headers['authorization']?.split(' ')[1];
  const refreshToken = req.body.refreshToken;

  console.log('accessToken: ', accessToken);
  console.log('refreshToken: ', refreshToken);

  if (!accessToken) {
    res.status(401).json({ message: 'No AccessToken Provided' });
  }

  if (!refreshToken) {
    res.status(401).json({ message: 'No RefreshToken Provided' });
  }

  const isAccessTokenExpired = () => {
    try {
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
          console.log('access decoded', decoded);
          if (decoded) {
            req.id = decoded.id;
            next();
          } else if (err.name === 'TokenExpiredError') {
            isRefreshTokenExpired();
            res.status(401).json({ message: 'AccessToken Expired' });
          } else if (err.name === 'JsonWebTokenError') {
            res.status(401).json({ message: err.message });
          }
        }
      );
    } catch (err) {
      next(err);
    }
  };

  const isRefreshTokenExpired = () => {
    const decodedAccessToken = jwt.decode(accessToken);
    const decodedRefreshToken = jwt.decode(refreshToken);

    if (decodedAccessToken.id !== decodedRefreshToken.id) {
      res.status(401).json({ message: 'Unauthorized RefreshToken' });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (decoded) {
          issueNewAccessToken();
        } else if (err.name === 'TokenExpiredError') {
          res.status(400).json({ message: 'RefreshToken Expired' });
        } else if (err.name === 'JsonWebTokenError') {
          res.status(401).json({ message: err.message });
        }
      }
    );
  };

  const issueNewAccessToken = () => {
    const decodedAccessToken = jwt.decode(accessToken);
    try {
      const accessToken = jwt.sign(
        {
          id: decodedAccessToken.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_EXPIRES_IN,
          issuer: 'basilfarm',
        }
      );

      res
        .status(200)
        .json({ message: 'Sign In Status Confirmed', accessToken });
    } catch (err) {
      res.status(500).json({ message: 'Issue New AccessToken Failed' });
    }
  };

  isAccessTokenExpired();
};
