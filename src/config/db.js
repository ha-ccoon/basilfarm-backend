import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// 데이터베이스 connection 객체 생성
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: '3306',
});

export default connection;