import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import apiRouter from './src/routes/index.js';
// import connection from './config/db.js';
import MqttClient from './mqtt/mqtt-client.js';
import DB from './db/db.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

// 정적 경로 설정
app.use('/static', express.static('uploads'));

// 포트 연결
const port = parseInt(process.env.PORT ?? '8080');

app.listen(port, () => {
  console.log(`🚀 서버가 포트 ${port}에서 운영중입니다.`);
});

// MQTT connection
const TOPIC_TYPE_INDEX = 0;
const mqttOptions = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

const mqttClient = new MqttClient(mqttOptions, ['data/unit001/#']);
mqttClient.connect();

mqttClient.setMessageCallback(async (topic, message) => {
  console.log(topic, message.toString());
  // 토픽 인식하기
  const topicType = topic.split('/')[TOPIC_TYPE_INDEX];
  const messageJson = JSON.parse(message);

  try {
    switch (topicType) {
      case 'data':
        db.insertData({
          idx: messageJson.idx,
          device_id: messageJson.device_id,
          temp: messageJson.temp,
          humidity: messageJson.humidity,
          light: messageJson.light,
          moisture: messageJson.moisture,
          created_at: new Date(messageJson.timestamp),
        });
        break;
      default:
        console.log("This topic isn't assigned");
        break;
    }
  } catch (err) {
    console.log(err);
  }
});

// MySQL connection 실행
const db = new DB({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

//커넥션 확인용 임시로 작성한 부분입니다
// connection.query('select * from `user`', function (err, result, field) {
//   console.log(err);
//   console.log(result);
//   console.log(field);
// });
