<<<<<<< Updated upstream
import insertDB from '../database.js';
=======
import DB from '../databases/database.js';
>>>>>>> Stashed changes

const db = new insertDB();

// /api/sensors?start_time=
// 전체 센서 데이터를 쿼리로 기입한 시작일 기점으로 가져오기
const getSensorData = async (req, res) => {
  const { start_time } = req.query;
  const query = `SELECT * FROM sensor_history WHERE created_at >= ?`;

  try {
    const [row] = await db.pool.query(query,[start_time]);
    res.json(row);
  } catch (err) {
<<<<<<< Updated upstream
      console.error(err);
      next(err);
=======
    console.error(err);
    next();
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      console.error(err);
      next(err);
=======
    console.error(err);
    next();
>>>>>>> Stashed changes
  }
};

export { getSensorData, getSensorDataByDeviceId };