import MqttClient from '../mqtt-client/mqtt-client.js';

const mqttOptions = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

const mqttClient = new MqttClient(mqttOptions);
mqttClient.connect();

export const commandCallback = async (req, res, next) => {
  const { command, actuator } = req.body;
  const { device_id } = req.params;

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
    await mqttClient.sendCommand(`cmd/${device_id}/${actuator}`, {
      command,
    });

    res.status(200).json({ message: '제어 명령이 디바이스로 전송되었습니다.' });
  } catch (err) {
    res.status(400).json({ message: '제어 명령 전송에 실패하였습니다.' });
  }
};

export default commandCallback;
