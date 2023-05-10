import jwt from 'jsonwebtoken';
import { findUser } from '../controller/user/user-db.js';
import dotenv from 'dotenv';
dotenv.config();

<<<<<<< Updated upstream
<<<<<<< HEAD
const verifyToken = (req, res, next) => {
  
}
export default loginAuth;
=======
export default loginAuth;
>>>>>>> dev
=======
const authAccessToken = async (req, res, next) => {
  try {
    // accessToken 유효성 검사
    const accessToken = req.headers.authorization?.split(' ')[1];
    console.log(accessToken);
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: 'Access Token이 존재하지 않습니다.' });
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // refreshToken 유효성 검사
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: 'Refresh Token이 존재하지 않습니다.' });
    }

    const verifyRefresh = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const existedId = await findUser(verifyRefresh);
    const confirmId = existedId.filter((data) => {
      return verifyRefresh.id === data.id;
    });

    // accessToken 재발급
    const issueAccessToken = jwt.sign(
      {
        id: confirmId,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '5m',
        issuer: 'basilfarm',
      }
    );

    // const encryptedAccessToken = crypto
    //   .createCipher('aes-256-cbc', process.env.ACCESS_TOKEN_SECRET)
    //   .update(accessTk, 'utf8', 'hex');

    res.cookie('accessToken', issueAccessToken, {
      secure: false,
      httpOnly: true,
    });

    res.status(200).json({ message: 'Access Token이 재발급 되었습니다.' });

    next();
  } catch (err) {
    res.status(401).json({
      message: 'Access Token 인증에 실패하였습니다. 재발급이 필요합니다.',
    });
    next(err);
  }
};

export default authAccessToken;
>>>>>>> Stashed changes
