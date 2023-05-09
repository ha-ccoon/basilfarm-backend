import mqttClient from '../app.js';
import DB from '../database.js';

const db = new DB();

export const commandCallback = async (req, res, next) => {
  const { device_id } = req.params;
  const { command, actuator } = req.body;

  if (!device_id || device_id === '') {
    res.status(400).json({ message: 'device_id error' });
    next();
  }
  if (!command || command !== 'run' || command !== 'stop') {
    res.status(400).json({ message: 'command error' });
    next();
  }

  return await mqttClient.sendCommand(`cmd/${device_id}/${actuator}`, {
    device_id,
    command,
  });
};
