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

  // // 자동 제어 상태 저장
  // async insertAutoStatus({
  //   device_id,
  //   status,
  //   target_temp,
  //   target_moisture,
  //   target_light,
  //   created_at,
  // }) {
  //   const formattedCreatedAt = new Date(created_at).toISOString().slice(0, 19).replace('T', ' ');

  //   const sql = 
  //     `INSERT INTO auto_status (device_id, status, target_temp, target_moisture, target_light, created_at)
  //     VALUES (${this.pool.escape(device_id)}, ${this.pool.escape(status)}, ${this.pool.escape(target_temp)}, ${this.pool.escape(target_moisture)}, ${this.pool.escape(target_light)}, '${formattedCreatedAt}')
  //     ON DUPLICATE KEY UPDATE status = ${status}, target_temp = ${target_temp}, target_moisture = ${target_moisture}, target_light = ${target_light}, created_at = '${formattedCreatedAt}';`

  //   const [rows] = await this.pool.query(sql);
  //   return rows;
  // }

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
  async insertUser({ id, password, phone, email, fullname, picture }) {
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
    const sql = await this.pool.query(
      'SELECT * FROM devices WHERE device_id = ?',
      [device_id]
    );
    return sql;
  }

  async insertDevice({
    device_id,
    device_macAddress,
    device_type,
    device_name,
  }) {
    const sql = await this.pool.query(
      'INSERT INTO devices(device_id,device_macAddress,device_type,device_name) VALUES (?,?,?,?)',
      [
        data.device_id,
        data.device_macAddress,
        data.device_type,
        data.device_name,
      ]
    );
    return { sql };
  }
}