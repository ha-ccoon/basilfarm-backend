import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export default class DB {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT,
      waitForConnections: true,
      queueLimit: 0,
    });
  }

  async insertData({
    idx,
    device_id,
    temp,
    humidity,
    light,
    water_level,
    moisture,
    created_at,
  }) {
    const sensorsql = `INSERT INTO sensor_history 
    (idx, device_id, temp, humidity, light, water_level, moisture, created_at) values (?,?,?,?,?,?,?,?)`;
    const rows = await this.pool.query(sensorsql, [
      idx,
      device_id,
      temp,
      humidity,
      light,
      water_level,
      moisture,
      created_at,
    ]);

    return { rows };
  }

  // 5분 주기로 데이터를 저장하는 함수
  async saveDataPeriodically(data) {
    const interval = 5 * 60 * 1000; // 5분 간격
    while (true) {
      await this.insertData(data);
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}
