import { mqttClient } from '../app.js';

export const commandCallback = async (req, res, next) => {
  const { command, actuator } = req.body;
  const { device_id } = req.params;
  mqttClient.connect();
  console.log('command, actuator, device_id: ', command, actuator, device_id);

  if (!device_id || device_id === '') {
    res.status(400).json({ message: 'device_id가 등록되지 않았습니다.' });
    next();
  }
  if (!command || command !== 'run' || command !== 'stop') {
    res.status(400).json({ message: 'command가 등록되지 않았습니다.' });
    next();
  }
  if (!actuator || actuator === '') {
    res.status(400).json({ message: 'actuator가 등록되지 않았습니다. ' });
    next();
  }

  if (command === 'pump') {
    
  }

  return mqttClient.sendCommand(`cmd/${device_id}/${actuator}`, {
    device_id,
    command,
  });
};

export default commandCallback;
