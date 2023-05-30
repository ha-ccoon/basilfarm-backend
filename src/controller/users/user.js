import DB from '../../database.js';

const db = new DB();

// 아이디 검색
export const findId = async (id) => {
  try {
    const [row] = await db.pool.query('SELECT * FROM user WHERE id = ?', [id]);
    console.log('아이디 검색: ', row);
    return row;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Database Error' });
  }
};

export const findPassword = async (id) => {
  try {
    const [row] = await db.pool.query(
      'SELECT password FROM user WHERE id = ?',
      [id]
    );
    return row;
  } catch (err) {
    console.log(err);
    // res.status(500).json({ message: 'Database Error' });
  }
};

// 유저 정보 검색
export const getUserInfo = async (req, res) => {
  try {
    const userId = req.id;
    const [row] = await db.pool.query(
      'SELECT id, phone, email, fullname, picture, device_id, created_at FROM user WHERE id = ?',
      [userId]
    );
    res.json(row);
  } catch (err) {
    res.status(500).json({ message: 'Database Error' });
  }
};
