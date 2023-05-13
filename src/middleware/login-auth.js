import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// 구현중 입니다.
const verifyToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      res.status(401).json({ message: 'AccessToken이 존재하지 않습니다.' });
    }

    // accessToken 유효성 검사
    const confirmAccess = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log('access: ', accessToken, confirmAccess);

    if (confirmAccess) {
      req.params.id = confirmAccess.id;
      res.status(200).json({ message: 'AccessToken이 검증 되었습니다.' });
      next();
    } else {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        res.status(401).json({ message: 'RefreshToken이 존재하지 않습니다.' });
      }

      // refreshToken 유효성 검사
      const confirmRefresh = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      console.log('refresh: ', refreshToken, confirmRefresh);

      if (!confirmRefresh) {
        res.status(401).json({ message: 'AccessToken이 만료되었습니다.' });
      }

      if (confirmAccess.id !== confirmRefresh.id) {
        res.status(400).json({
          message: 'AccessToken과 RefreshToken의 payload가 일치 하지 않습니다.',
        });
        console.log('id: ', confirmAccess.id, confirmRefresh.id);
      }
      req.params.id = confirmRefresh.id;
      res.cookie('accessToken', accessTk, {
        httpOnly: true,
        secure: false,
      });
    }
  } catch (err) {
    res.status(401).json({ message: 'AccessToken 재발급에 실패하였습니다.' });
    next();
  }
};

const verifyRefreshToken = (req, res, next) => {};

const reissueAccessToken = async (req, res, next) => {};

export default verifyToken;
