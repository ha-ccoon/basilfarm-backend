import DB from '../../database.js';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const db = new DB();
const saltRound = 10;
const condition =
  '/^(?=.*[a-zA-Z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/';

const signUpUser = async (req, res, next) => {
  try {
    const { id, password, email, phone, fullname } = req.body;

    // id 중복 검사
    const idQuery = 'SELECT * FROM user WHERE id=?';
    await db.idQuery(idQuery, [id], (err, id) => {
      if (err) {
        console.log('MySQL 쿼리 에러: ', err);
        next();
      }
      if (id) {
        return res.json({ message: '이미 존재하는 유저입니다.' });
      }
    });

    // password
    if (!password.match(condition)) {
      return res.status(400).json({
        message:
          '비밀번호는 영문자, 숫자, 특수문자를 포함한 8자리 이상이어야 합니다.',
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
    });

    res.status(200).json({ message: '유저 정보가 생성되었습니다.' });
  } catch (err) {
    res.status(400).json({ message: '유저 생성에 실패하였습니다.' });
    next(err);
  }
};

export default signUpUser;
