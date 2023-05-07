import getDBConnection from '../app.js';
import WebSocket from 'ws';

const realTimeCallback = async (req, res, next) => {
  try {
    const wss = new WebSocket.Server({ port: 8001 });
    wss.on('connection', (ws, err) => {
      if (!err) {
        console.log('Wss is connected');
      } else {
        // console.log('Wss Connection Error: ', err);
      }
      ws.on('message', (data) => {
        console.log(`Received from user: ${data}`);
        ws.send(`Received from server ${data}`);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

// realTimeCallback();

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

export { messageCallback, realTimeCallback };
