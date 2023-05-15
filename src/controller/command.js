import { mqttClient } from '../app.js';

export const commandCallback = async (req, res, next) => {
  const { command, actuator, target_moisture } = req.body;
  const { device_id } = req.params;
  const mqttConnection = mqttClient.connect();

  try {
    if (!device_id || device_id === '') {
      res.status(400).json({ message: 'device_id가 등록되지 않았습니다.' });
    }
    if (!command || command === '') {
      res.status(400).json({ message: 'command가 등록되지 않았습니다.' });
    }
    if (!actuator || actuator === '') {
      res.status(400).json({ message: 'actuator가 등록되지 않았습니다. ' });
    }

    // 일반 디바이스 명령
    mqttClient.sendCommand(`cmd/${device_id}/${actuator}`, {
      device_id,
      command: 'run',
    });

    // 펌프 전용 명령
    if (actuator === 'pump' && command === 'run') {
      const managePump = setTimeout((device_id) => {
        mqttClient.sendCommand(`cmd/${device_id}/pump`, {
          device_id,
          command,
        });
      }, 10000);
      if (
        target_moisture < target_moisture * 0.9 &&
        target_moisture > target_moisture * 1.1
      ) {
        return managePump;
      } else {
        mqttClient.sendCommand(`cmd/${device_id}/pump`, {
          device_id,
          command: 'stop',
        });
      }
    }

    res.status(200).json({ message: '제어 명령이 디바이스로 전송되었습니다.' });
  } catch (err) {
    res.status(400).json({ message: '제어 명령 전송에 실패하였습니다.' });
  }
};

export default commandCallback;
