import insertDB from '../database.js';

const db = new insertDB();

const getSensorData = async (req, res) => {
  const { start_time } = req.query;
  const query = `SELECT * FROM sensor_history WHERE created_at >= ?`;

  try {
    const [row] = await db.pool.query(query,[start_time]);
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const getSensorDataByDeviceId = async (req, res) => {
  const { device_id } = req.params;
  const { start_time } = req.query;
  const query = `SELECT * FROM sensor_history WHERE device_id = ? AND created_at >= ?`;
  
  try {
    const [row] = await db.pool.query(query, [device_id, start_time]);
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export { getSensorData, getSensorDataByDeviceId };