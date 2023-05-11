import { findUser } from './user-db.js';
import bcrypt from 'bcrypt';

const saltRound = 10;
const condition = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;

const signUpUser = async (req, res, next) => {
  try {
    const { id, password, email, phone, fullname, created_at } = req.body;

    // id 중복 검사
    const existedId = await findUser(id);
    const confirmId = existedId.filter((data) => data.id === id);
    if (!confirmId) {
      return res.status(400).json({ message: '존재하지 않는 사용자 입니다.' });
    }

    // password
    if (!condition.test(password)) {
      return res.status(400).json({
        message:
          '비밀번호는 영문자, 숫자, 특수문자를 포함하여 총 8 ~ 16 자리여야 합니다.',
      });
    }

    const salt = bcrypt.genSaltSync(saltRound);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await db.saveUser({
      id,
      password: hashedPassword,
      email,
      phone,
      fullname,
      created_at,
    });

    res.status(200).json({ message: '유저 정보가 생성되었습니다.' });
  } catch (err) {
    res.status(400).json({ message: '유저 생성에 실패하였습니다.' });
    next(err);
  }
};

export default signUpUser;
