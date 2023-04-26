import mysql from 'mysql2';

// 데이터베이스 connection 객체 생성
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

// MySQL connection 실행
connection.connect((error) => {
  if (error) throw error;
  console.log(`데이터베이스에 정상적으로 연결되었습니다.`);
});

export default connection;
