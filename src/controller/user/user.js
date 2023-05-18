import DB from '../../database.js';

const db = new DB();

// 아이디 검색
const findId = async (id) => {
  try {
    const [row] = await db.pool.query('SELECT * FROM user WHERE id = ?', [id]);
    return row;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 유저 검색
// const findPassword = async (password) => {
//   try {
//     const [row] = await db.pool.query('SELECT * FROM user WHERE password = ?', [
//       password,
//     ]);
//     return row;
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// 유저 정보 검색
const userInfo = async (req, res) => {
  try {
    const userId = req.id;
    const [row] = await db.pool.query(
      'SELECT id, phone, email, fullname, picture, device_id, created_at FROM user WHERE id = ?',
      [userId]
    );
    res.json(row);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { findId, userInfo };
