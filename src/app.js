import express from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes/index.js';
import connection from './config/db.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

//정적 경로 설정
app.use('/static', express.static('uploads'));

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

