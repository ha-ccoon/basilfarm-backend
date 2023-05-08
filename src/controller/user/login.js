const login = (req, res, next) => {
  const { email, password } = req.body;

  // DB에 로그인 정보 확인
  const userInfo = db.filter((data) => {
    return id === data.id;
  });

  if (!userInfo) {
    res.status(403).json('존재 하지 않는 아이디입니다.');
  } else {
    try {
      // accessToken 발행
      const accessToken = jwt.sign(
        {
          id: userInfo.id,
          email: userInfo.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '1m',
          issuer: 'basilfarm',
        }
      );

      res.cookie('accessToken', accessToken, {
        secure: false,
        httpOnly: true,
      });

      // refreshToken 발행
      const refreshToken = jwt.sign(
        {
          id: userInfo.id,
          email: userInfo.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '24h',
          issuer: 'basilfarm',
        }
      );

      res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true,
      });

      res.status(200).json({ message: '로그인에 성공하였습니다.' });
    } catch (err) {
      res.status(500).json({ message: '로그인 에러' });
    }
  }
};

export default login;
