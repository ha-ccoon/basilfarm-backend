import DB from '../database.js';

const db = new DB();

// /api/sensors?start_time=
// 전체 센서 데이터를 쿼리로 기입한 시작일 기점으로 가져오기
const getSensorData = async (req, res) => {
  const { start_time } = req.query;
  const query = `SELECT * FROM sensor_history WHERE created_at >= ?`;

  try {
    const [row] = await db.pool.query(query, [start_time]);
    res.json(row);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// /api/sensors/:device_id?start_time=
// 특정 디바이스 센서 데이터를 쿼리로 기입한 시작일 기점으로 가져오기
const getSensorDataByDeviceId = async (req, res) => {
  const { device_id } = req.params;
  const { start_time } = req.query;
  const query = `SELECT * FROM sensor_history WHERE device_id = ? AND created_at >= ?`;

  try {
    const [row] = await db.pool.query(query, [device_id, start_time]);
    res.json(row);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export { getSensorData, getSensorDataByDeviceId };