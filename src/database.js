import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
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

  // sensor 데이터 저장
  async insertSensorHistory({
    idx,
    device_id,
    temp,
    humidity,
    light,
    water_level,
    moisture,
    created_at,
  }) {
    const sql = `INSERT INTO sensor_history 
    (idx, device_id, temp, humidity, light, water_level, moisture, created_at) VALUES (?,?,?,?,?,?,?,?)`;
    const row = await this.pool.query(sql, [
      idx,
      device_id,
      temp,
      humidity,
      light,
      water_level,
      moisture,
      created_at,
    ]);
    return { row };
  }

  // actuator 현재 상태 데이터 저장
  async insertActuatorConfig({
    idx,
    device_id,
    pump,
    led,
    fan,
    peltier,
    created_at,
  }) {
    const sql = `INSERT INTO actuator_config 
  (idx, device_id, pump, led, fan, peltier, created_at) VALUES (?,?,?,?,?,?,?)`;
    const row = await this.pool.query(sql, [
      idx,
      device_id,
      pump,
      led,
      fan,
      peltier,
      created_at,
    ]);
    return { row };
  }

  // 유저 데이터 저장
  async saveUser({ id, password, phone, email, fullname, picture }) {
    const sql = `INSERT INTO user
  (id, password, phone, email, fullname, picture) VALUES (?,?,?,?,?,?)`;
    const row = await this.pool.query(sql, [
      id,
      password,
      phone,
      email,
      fullname,
      picture,
    ]);

    return { row };
  }

  async deviceCheck(device_id) {
    const result = await this.promisePool.query(
      'SELECT * FROM devices WHERE device_id = ?',
      [device_id]
    );
    return result;
  }

  async insertDevice({
    device_id,
    device_macAddress,
    device_type,
    device_name,
  }) {
    const result = await this.promisePool.query(
      'INSERT INTO devices(device_id,device_macAddress,device_type,device_name) VALUES (?,?,?,?)',
      [
        data.device_id,
        data.device_macAddress,
        data.device_type,
        data.device_name,
      ]
    );
    return result;
  }
}
