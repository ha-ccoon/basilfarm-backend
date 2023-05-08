import DB from '../../database.js';
import bcrypt from 'bcrypt';

const db = new DB();
const saltRound = 10;
const condition =
  '/^(?=.*[a-zA-Z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/';

const registerUser = (req, res, next) => {
  try {
    const { id, password, email, phone, fullname } = req.body;

    // id 중복 검사
    const queryId = 'SELECT * FROM user WHERE email=?';
    const existedId = db.queryId(queryId, [id], (err, id) => {
      if (err) {
        console.log('MySQL 쿼리 에러: ', err);
        next();
      }
      if (existedId) {
        return res.json({ message: '이미 존재하는 유저입니다.' });
      }
    });

    // password
    if (password.match(condition)) {
      return res.status(400).json({
        message:
          '비밀번호는 영문자, 숫자, 특수문자를 포함한 8자리 이상이어야 합니다.',
      });
    }

    const salt = bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(password, salt);

    const userId = { id, password, email, phone, fullname };
    const queryUser = 'INSERT INTO user (id, password, email, phone, fullname) VALUES (?,?,?,?,?)';
    db.queryUser(userId, [createUser]);
  } catch (err) {}
};

export default registerUser;
