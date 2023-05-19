import { findId } from './user.js';
import bcrypt from 'bcrypt';
import { getDBConnection } from '../../app.js';

const saltRound = 10;
const condition = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;

const signUp = async (req, res, next) => {
  try {
    const { id, password, email, phone, fullname, device_id } = req.body;
    const db = getDBConnection();

    // 아이디 중복 검사
    const existedId = await findId(id);
    const confirmId = existedId.filter((data) => data.id === id);
    if (!confirmId) {
      res.status(200).json({ message: '사용 가능한 아이디 입니다.' });
    }

    // 비밀번호 중복 검사
    if (!condition.test(password)) {
      res.status(400).json({
        message:
          '비밀번호는 영문자, 숫자, 특수문자를 포함하여 총 8 ~ 16 자리여야 합니다.',
      });
    }

    const salt = bcrypt.genSaltSync(saltRound);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await db.insertUser({
      id,
      password: hashedPassword,
      email,
      phone,
      fullname,
      device_id,
      created_at: Date.now(),
    });

    res.status(200).json({ message: '유저 정보가 생성되었습니다.' });
  } catch (err) {
    res.status(400).json({ message: '이미 가입된 유저입니다.' });
    next(err);
  }
};

export default signUp;
