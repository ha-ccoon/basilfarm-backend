import { findById } from './users.js';
import bcrypt from 'bcrypt';
import { getDBConnection } from '../../app.js';

const saltRound = 10;
const condition = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;

const signUpUser = async (req, res, next) => {
  try {
    const { id, password, email, phone, fullname, device_id } = req.body;
    const db = getDBConnection();

    // 아이디 중복 검사
    const existedId = await findById(id);
    const confirmId = existedId.filter((data) => data.id === id);

    if (!confirmId) {
      res.status(200).json({ message: 'Available Id' });
    }

    // 비밀번호 중복 검사
    if (!condition.test(password)) {
      res.status(403).json({
        message:
          'Password must be in 8 - 16 letters, including English alphabets, numbers, and special characters',
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

    res.status(200).json({ message: 'User information has been created' });
  } catch (err) {
    res.status(403).json({ message: 'Registered user' });
    next(err);
  }
};

export default signUpUser;
