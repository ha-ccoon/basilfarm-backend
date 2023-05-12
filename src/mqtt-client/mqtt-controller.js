// import MqttClient from './mqtt-client.js';
import { getDBConnection, mqttClient } from '../app.js';

const initialPubTopic = 'initialResponse';

const setInitialSubTopic = async (topic, message) => {
  try {
    const db = getDBConnection();
    mqttClient.connect();
    const deviceInfo = JSON.parse(message);
    console.log('data', deviceInfo);
    const result = await db.deviceCheck(deviceInfo.device_id);

    if (result[0].length === 0) {
      await db.insertDevice(deviceInfo);
      await mqttClient.sendCommand(initialPubTopic, {
        sensor: `data/${deviceInfo.device_id}/#`,
        actuator: `control/${deviceInfo.device_id}/#`,
      });
      console.log('initial Response sent');
      return;
    }
    if (result[0][0].device_id === deviceInfo.device_id) {
      console.log('result[0]', result[0]);
      await mqttClient.sendCommand(initialPubTopic, {
        sensor: `data/${deviceInfo.device_id}/#`,
        actuator: `cmd/${deviceInfo.device_id}/#`,
      });
      console.log('initial Response sent');
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

const messageCallback = async (topic, message) => {
  console.log(topic, message.toString());
  // 토픽 인식하기
  const topicType = topic.split('/')[0];
  const messageJson = JSON.parse(message);

  try {
    switch (topicType) {
      case 'data':
        const db = getDBConnection();
        await db.insertSensorHistory({
          idx: messageJson.idx,
          device_id: messageJson.device_id,
          temp: messageJson.temp,
          humidity: messageJson.humidity,
          light: messageJson.light,
          water_level: messageJson.water_level,
          moisture: messageJson.moisture,
          created_at: messageJson.created_at,
        });
        break;

      case 'cmd':
        await db.insertActuatorConfig({
          idx: messageJson.idx,
          device_id: messageJson.device_id,
          pump: messageJson.pump ? 1 : 0,
          led: messageJson.led ? 1 : 0,
          fan: messageJson.fan ? 1 : 0,
          peltier: messageJson.peltier,
          created_at: messageJson.created_at,
        });
        break;

      default:
        console.log("This topic isn't assigned");
        break;
    }
  } catch (err) {
    console.log(err);
  }
};

export { messageCallback, setInitialSubTopic };
