import express from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes/index.js';
import DB from './dbconfig.js';
import MqttSetup from './mqtt-client/mqtt-client.js';
import messageCallback from './mqtt-client/mqtt-controller.js';
import cors from 'cors';
import WebSocket from 'ws';

dotenv.config();

const app = express();
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


// MySQL connection 실행
connection.connect();

connection.connect(function (err) {
  if (err) throw err;
  console.log(`🟢 basilFarmDB에 정상적으로 연결되었습니다.`);
});

