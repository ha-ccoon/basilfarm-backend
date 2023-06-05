import { mqttClient } from '../app.js';

export const manualCommand = async (req, res, next) => {
  const { command, actuator } = req.body;
  const { device_id } = req.params;
  mqttClient.connect();

  try {
    if (!device_id || device_id === '') {
      res.status(400).json({ message: 'No device_id Provided' });
    }
    if (!command || command === '') {
      res.status(400).json({ message: 'No Command Provided' });
    }
    if (!actuator || actuator === '') {
      res.status(400).json({ message: 'No Actuator Provided' });
    }

    // 일반 디바이스 명령
    mqttClient.sendCommand(`cmd/${device_id}/${actuator}`, {
      command,
    });

    res.status(200).json({ message: 'Command has been sent' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to send command' });
  }
};

export default manualCommand;
