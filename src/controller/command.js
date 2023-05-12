import { mqttClient } from '../app.js';

export const commandCallback = async (req, res, next) => {
  mqttClient.connect();
  const { command, actuator } = req.body;
  const { device_id } = req.params;
  console.log('command, actuator, device_id: ', command, actuator, device_id);

  if (!device_id || device_id === '') {
    res.status(400).json({ message: 'device_id가 등록되지 않았습니다.' });
  }
  // if (!command || command !== 'run' || command !== 'stop') {
  //   res.status(400).json({ message: 'command가 등록되지 않았습니다.' });
  // }
  if (!actuator || actuator === '') {
    res.status(400).json({ message: 'actuator가 등록되지 않았습니다. ' });
  }

  if (command === 'pump' && actuator === 'run') {
    const { target } = req.body;
  }

  mqttClient.sendCommand(`cmd/${device_id}/${actuator}`, {
    device_id,
    command,
  });
  res.status(200).json({ message: '디바이스로 제어 명령이 전송되었습니다.' });
};

export default commandCallback;
