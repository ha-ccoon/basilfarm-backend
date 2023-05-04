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
    const realtimesql = `INSERT INTO realtime 
    (device_id, temp, humidity, light, water_level, moisture, created_at) 
    values (?,?,?,?,?,?,?) 
    ON DUPLICATE KEY UPDATE 
    temp=VALUES(temp), humidity=VALUES(humidity), light=VALUES(light), 
    water_level=VALUES(water_level), moisture=VALUES(moisture), created_at=VALUES(created_at)`;
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
    const rows2 = await this.pool.query(realtimesql, [
      device_id,
      temp,
      humidity,
      light,
      water_level,
      moisture,
      created_at,
    ]);
    return { rows, rows2 };
  }
}