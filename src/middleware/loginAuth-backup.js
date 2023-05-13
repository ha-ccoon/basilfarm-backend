// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// // import { promisify } from 'util';
// dotenv.config();

// const verifyAccessToken = (req, res, next) => {
//   const accessToken = req.headers.authorization?.split(' ')[1];
//   if (!accessToken) {
//     res.status(401).json({ message: 'AccessToken이 존재하지 않습니다.' });
//   }

//   const confirmAccess = jwt.verify(
//     accessToken,
//     process.env.ACCESS_TOKEN_SECRET
//   );
//   if (!confirmAccess) {
//     res.status(401).json({ message: 'AccessToken이 만료되었습니다.' });
//   }

//   console.log('access: ', accessToken, confirmAccess);
// };

// const verifyRefreshToken = (req, res, next) => {
//   const refreshToken = req.cookies.refreshToken;
//   console.log(refreshToken);
//   if (!refreshToken) {
//     res.status(401).json({ message: 'RefreshToken이 존재하지 않습니다.' });
//   }

//   const confirmRefresh = jwt.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_SECRET
//   );
//   if (!confirmRefresh) {
//     res.status(401).json({ message: 'AccessToken이 만료되었습니다.' });
//   }

//   console.log('refresh: ', refreshToken, confirmRefresh);
// };

// const reissueAccessToken = async (req, res, next) => {
//   try {
//     const decodedRefreshToken = await verifyRefreshToken(refreshToken);
//     const decodedAccessToken = await verifyAccessToken(accessToken);
//     if (decodedRefreshToken.id !== decodedAccessToken.id) {
//       res.status(400).json({
//         message: 'AccessToken과 RefreshToken의 payload가 일치 하지 않습니다.',
//       });
//       next();
//     }

//     const newAccessTk = jwt.sign(
//       {
//         id: decodedAccessToken.id,
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       {
//         expiresIn: '5m',
//         issuer: 'basilfarm',
//       }
//     );

//     res.cookie('accessToken', newAccessTk, {
//       httpOnly: true,
//       secure: false,
//     });

//     res.status(200).json({ message: '새로운 AccessToken이 발급 되었습니다.' });
//   } catch (err) {
//     res.status(401).json({ message: 'AccessToken 재발급에 실패하였습니다.' });
//     next();
//   }
// };

// export { verifyAccessToken, verifyRefreshToken, reissueAccessToken };
