import DB from '../../database.js';

const db = new DB();

// 유저 검색
const findUser = async (id) => {
  try {
    const [row] = await db.pool.query('SELECT * FROM user WHERE id = ?', [id]);
    return row;
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};

// 유저 정보 검색
const userInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const [row] = await db.pool.query('SELECT * FROM user WHERE id = ?', [
      userId,
    ]);
    res.json(row);
  } catch (err) {
    throw Error();
  }
};

export { findUser, userInfo };
