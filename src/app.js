import express from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes/index.js';
import insertDB from './database.js';
import MqttClient from './mqtt-client/mqtt-client.js';
import messageCallback from './mqtt-client/mqtt-controller.js';
import cors from 'cors';

dotenv.config();
const app = express();

// 모든 도메인의 요청을 허용하는 cors 옵션
const corsOptions = {
  origin: '*',
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use('/api', apiRouter);

app.use('/static', express.static('uploads'));
app.set('view engine', 'ejs');

// 포트 연결
const port = parseInt(process.env.PORT ?? '8080');

app.listen(port, () => {
  console.log(`🚀 서버가 포트 ${port}에서 운영중입니다.`);
});

// MQTT connection 실행
const mqttOptions = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

const mqttClient = new MqttClient(mqttOptions, ['data/unit002/#']);
mqttClient.connect();
mqttClient.subscribe();
mqttClient.receiveMessage(messageCallback);

// MySQL connection 실행
const getDBConnection = () => {
  const db = new insertDB();
  return db;
};

export default getDBConnection;