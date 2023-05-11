import getDBConnection from '../app.js';
import WebSocket from 'ws';

const messageCallback = async (topic, message) => {
  console.log(topic, message.toString());
  // 토픽 인식하기
  const topicType = topic.split('/')[0];
  const messageJson = JSON.parse(message);

  try {
    switch (topicType) {
      case 'data':
        const db = getDBConnection();
        await db.insertData({
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

export default messageCallback;
