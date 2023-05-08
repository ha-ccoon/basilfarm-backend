import mqttClient from '../app.js';
import insertDB from '../database.js';

const db = new insertDB();

const getOneDevice = async (device_id) => {
  const sql = `SELECT * FROM device where device_id=?`;
  const row = await this.pool.query(sql, [device_id, id]);
  return { row };
};

const commandCallback = async (req, res) => {
  const { device_id } = req.params;
  const { actuator } = req.query;
  const { command } = req.body;

  if (!device_id || device_id === '') {
    res.status(400).json({ message: 'device_id error' });
  } else if (!command || command !== 'run' || command !== 'stop') {
    res.status(400).json({ message: 'command error' });
  }

  const device = await db.getOneDevice(device_id);

  return await mqttClient.sendCommand(`cmd/${device_id}/${actuator}`, {
    device_id: device.device_id,
    command,
  });
};

export { getOneDevice, commandCallback };