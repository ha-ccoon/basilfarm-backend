import DB from '../database.js';

const db = new DB();

const getDeviceInfo = async (req, res) => {
  try {
    const { device_id } = req.params;
    const sql = 'SELECT * FROM device WHERE device_id = ?';
    const [row] = await db.pool.query(sql, [device_id]);
    res.json(row);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: '데이터베이스에서 정보를 가져오는 것을 실패했습니다.' });
  }
};

export default getDeviceInfo;
