import express from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes/index.js';
import DB from './database.js';
import MqttClient from './mqtt-client/mqtt-client.js';
import {
  messageCallback,
  setInitialSubTopic,
} from './mqtt-client/mqtt-controller.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://34.64.110.118"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', apiRouter);

// 포트 연결
const port = parseInt(process.env.PORT ?? '8080');

app.listen(port, () => {
  console.log(`🚀 서버가 포트 ${port}에서 운영중입니다.`);
});

// MQTT 연결
const mqttOptions = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

const mqttClient = new MqttClient(mqttOptions, [
  'data/B48A0A75ADA0/#',
  'state/B48A0A75ADA0/#',
  'cmd/B48A0A75ADA0/#',
]);

<<<<<<< Updated upstream
// const mqttClient = new MqttClient(mqttOptions, initialSubTopic);
// mqttClient.connect();
// mqttClient.subscribe();
// mqttClient.receiveMessage(setInitialSubTopic);
// mqttClient.receiveMessage(messageCallback);

const mqttClient = new MqttClient(mqttOptions, [
  'data/B48A0A75ADA0/#',
  'state/B48A0A75ADA0/#',
  'cmd/B48A0A75ADA0/#',
]);
=======
>>>>>>> Stashed changes
mqttClient.connect();
mqttClient.subscribe();
mqttClient.receiveMessage(messageCallback);

<<<<<<< Updated upstream
// const mqttClient1 = new MqttClient(mqttOptions);
// mqttClient1.connect();
// mqttClient1.subscribe('data/B48A0A75ADA0/#');
// mqttClient1.receiveMessage(messageCallback);
// mqttClient1.error();

// const mqttClient2 = new MqttClient(mqttOptions);
// mqttClient2.connect();
// mqttClient2.subscribe('state/B48A0A75ADA0/data');
// mqttClient2.receiveMessage(messageCallback);
// mqttClient2.error();

// const mqttClient3 = new MqttClient(mqttOptions);
// mqttClient3.connect();
// mqttClient3.subscribe('cmd/B48A0A75ADA0/#');
// mqttClient3.receiveMessage(messageCallback);
// mqttClient3.error();

// MySQL connection 실행
const getDBConnection = () => {
=======
// MySQL 연결
const getDBConnection = (err) => {
  if (err) {
    res.status(500).json({ message: '데이터베이스 연결에 문제가 있습니다.' });
    console.log('');
  }
>>>>>>> Stashed changes
  const db = new DB();
  return db;
};

// 전역 에러 핸들러
app.use((req, res, next, err) => {
  res.status(500).json({ message: 'Internal Server Error' });
<<<<<<< Updated upstream
};

app.use(errorHandler);

=======
  console.log(err);
});

>>>>>>> Stashed changes
export { getDBConnection, mqttClient };
