import getDBConnection from '../app.js';

let topic = 'data/unit002/#';
const initialPubTopic = 'initialResponse';

const setInitialSubTopic = async (topic, message) => {
  try {
    const deviceInfo = JSON.parse(message);
    console.log('data', deviceInfo);
    const result = await db.deviceCheck(deviceInfo.device_id);

    if (result[0].length === 0) {
      await db.insertDevice(deviceInfo);
      await mqttClientInit.sendCommand(initialPubTopic, {
        sensor: `data/${deviceInfo.device_id}/#`,
        actuator: `control/${deviceInfo.device_id}/#`,
      });
      console.log('initial Response sent');
      return;
    }
    if (result[0][0].device_id === deviceInfo.device_id) {
      console.log('result[0]', result[0]);
      await mqttClientInit.sendCommand(initialPubTopic, {
        sensor: `data/${deviceInfo.device_id}/#`,
        actuator: `control/${deviceInfo.device_id}/#`,
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
      default:
        console.log("This topic isn't assigned");
        break;
    }
  } catch (err) {
    console.log(err);
  }
};

export { messageCallback, setInitialSubTopic };
