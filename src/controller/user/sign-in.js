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
    retrun;
  }

  try {
    const accessToken = jwt.sign(
      {
        id: userInfo.id,
        created_at: userInfo.created_at,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h',
        issuer: 'basilfarm',
      }
    );

    const refreshToken = jwt.sign(
      {
        id: userInfo.id,
        email: userInfo.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '14d',
        issuer: 'basilfarm',
      }
    );

    res.header('Authorization', `Bearer ${accessToken}`).send();
    res.header('Authorization', `Bearer ${refreshToken}`).send();

    res.status(200).json({ message: '로그인에 성공하였습니다.' });
  } catch (err) {
    res.status(500).json({ message: '로그인 에러' });
  }
};

export default login;
