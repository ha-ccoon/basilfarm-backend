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
    res.status(500).json({ message: 'Database Error' });
  }
};

export default getDeviceInfo;
