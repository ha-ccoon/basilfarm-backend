import getDBConnection from '../../app.js';

const login = (req, res, next) => {
  const { email, password } = req.body;
  const db = getDBConnection();

  // DB에 로그인 정보 확인
  const userInfo = db.saveUser.filter((data) => {
    return id === data.id;
  });

  if (!userInfo) {
    res.status(403).json({ message: '존재 하지 않는 아이디입니다.' });
    next();
  }

  try {
    const accessTk = jwt.sign(
      {
        id: userInfo.id,
        created_at: userInfo.created_at,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_EXPIRES_IN,
        issuer: 'basilfarm',
      }
    );

    const refreshTk = jwt.sign(
      {
        id: userInfo.id,
        email: userInfo.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_EXPIRES_IN,
        issuer: 'basilfarm',
      }
    );

    const encryptedAccessToken = crypto
      .createCipher('aes-256-cbc', process.env.ACCESS_TOKEN_SECRET)
      .update(accessTk, 'utf8', 'hex');
    const encryptedRefreshToken = crypto
      .createCipher('aes-256-cbc', process.env.REFRESH_TOKEN_SECRET)
      .update(refreshTk, 'utf8', 'hex');

    res.cookie('accessToken', encryptedAccessToken, {
      httpOnly: true,
      secure: true,
    });

    res.cookie('refreshToken', encryptedRefreshToken, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({ message: '로그인에 성공하였습니다.' });
  } catch (err) {
    next(err);
  }
};

export default login;
