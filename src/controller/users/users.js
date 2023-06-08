import DB from '../../database.js';

const db = new DB();

// 아이디 검색
export const findById = async (id) => {
  try {
    const [row] = await db.pool.query('SELECT * FROM users WHERE id = ?', [id]);
    console.log('아이디 검색: ', row);
    return row;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Database Error' });
  }
};

export const findByPassword = async (id) => {
  try {
    const [row] = await db.pool.query(
      'SELECT password FROM users WHERE id = ?',
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
  const userId = req.id;
  try {
    const [row] = await db.pool.query(
      'SELECT id, phone, email, fullname, picture, device_id, created_at FROM users WHERE id = ?',
      [userId]
    );
    res.json(row);
  } catch (err) {
    res.status(500).json({ message: 'Database Error' });
  }
};

// 유저 정보 수정
// export const updateUser = async (req, res) => {
//   const { id, password, phone, email, device_id } = req.body;
//   try {
//     const [row] = await db.pool.query(
//       'UPDATE id, password, phone, email, device_id SET id = ?, password = ?, phone = ?, email = ?, '
//     )
//   } catch (err) {}
// };
