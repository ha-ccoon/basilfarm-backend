import DB from '../database.js';

const db = new DB();

const getActuatorData = async (req, res) => {
  try {
    const [rows] = await db.pool.query(
      'SELECT * FROM actuator_config DESC LIMIT 10 '
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const getActuatorDataByDeviceId = async (req, res) => {
  const { device_id } = req.params;
  try {
    const [rows] = await db.pool.query(
      'SELECT * FROM actuator_config WHERE device_id = ?',
      [device_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export { getActuatorData, getActuatorDataByDeviceId };
