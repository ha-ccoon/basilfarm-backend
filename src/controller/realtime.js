import insertDB from '../database.js';

const db = new insertDB();

const getRealtimeDataByDeviceID = async (req, res) => {
  const { device_id } = req.params;
  try {
    const [rows] = await db.pool.query(
    "SELECT * FROM realtime WHERE device_id = ?",
    [device_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export { getRealtimeDataByDeviceID };