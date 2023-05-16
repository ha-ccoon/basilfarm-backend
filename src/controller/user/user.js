import DB from '../../database.js';

const db = new DB();

// 유저 검색
const findUser = async (id) => {
  try {
    const [row] = await db.pool.query('SELECT * FROM user WHERE id = ?', [id]);
    return row;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 유저 정보 검색
const userInfo = async (req, res) => {
  try {
    const userId = req.id;
    const [row] = await db.pool.query('SELECT * FROM user WHERE id = ?', [
      userId,
    ]);
    res.json(row);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { findUser, userInfo };
