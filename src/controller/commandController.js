import mqttClient from '../app.js';
import DB from '../dbconfig.js';

const db = new DB();

export const commandCallback = async (req, res) => {
  const { device_id } = req.params;
  const { actuator } = req.query;
  const { command } = req.body;

  if (!device_id || device_id === '') {
    res.status(400).json('device_id error');
  } else if (!command || command !== 'run' || command !== 'stop') {
    res.status(400).json('command error');
  }

  const device = await db.getOneDevice(device_id);

  await mqttClient.sendCommand(`cmd/${device_id}/${actuator}`, {
    device_id: device.device_id,
    command,
  });
};
