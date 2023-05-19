import DB from '../../database.js';

const db = new DB();

// 아이디 검색
const findId = async (id) => {
  try {
    const [row] = await db.pool.query('SELECT * FROM user WHERE id = ?', [id]);
    return row;
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: '데이터베이스에서 정보를 가져오는 것을 실패했습니다.' });
  }
};

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
    res
      .status(500)
      .json({ message: '데이터베이스에서 정보를 가져오는 것을 실패했습니다.' });
  }
};

export { findId, userInfo };
