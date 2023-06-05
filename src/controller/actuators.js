import DB from '../database.js';

const db = new DB();

// /api/actuators?start_time=
// 전체 엑츄에이터 데이터를 쿼리로 기입한 시작일 기점으로 가져오기
const getActuatorData = async (req, res) => {
  const { start_time } = req.query;
  const query = `SELECT * FROM actuator_config WHERE created_at >= ?`;

  try {
    const [row] = await db.pool.query(query, [start_time]);
    res.json(row);
  } catch (err) {
    res.status(500).json({ message: 'Database Error' });
    console.error(err);
  }
};

// /api/actuators/:device_id?start_time=
// 특정 디바이스 엑츄에이터 데이터를 쿼리로 기입한 시작일 기점으로 가져오기
const getActuatorDataByDeviceId = async (req, res) => {
  const { device_id } = req.params;
  const { start_time } = req.query;
  const query = `SELECT * FROM actuator_config WHERE device_id = ? AND created_at >= ?`;

  try {
    const [row] = await db.pool.query(query, [device_id, start_time]);
    res.json(row);
  } catch (err) {
      res.status(500).json({ message: 'Database Error' });
      console.error(err);
  }
};

export { getActuatorData, getActuatorDataByDeviceId };
