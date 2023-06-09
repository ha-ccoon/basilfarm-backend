import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

dotenv.config();

export default class DB {
  pool = undefined;

  constructor() {
    if (this.pool === undefined) {
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
  }s

  // 누적 센서 데이터 삽입
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
    try {
      const sql = `INSERT INTO sensor_history 
    (idx, device_id, temp, humidity, light, water_level, moisture, created_at) VALUES (?,?,?,?,?,?,?,?)`;
      const fields = [
        idx,
        device_id,
        temp,
        humidity,
        light,
        water_level,
        moisture,
        created_at,
      ];
      const rows = await this.pool.query(sql, fields);
      return rows;
    } catch (err) {
      res.status(500).json({ message: 'Database Error' });
      console.log(err.message);
    }
  }

  // 자동 제어 상태 저장
  async insertAutoStatus({
    device_id,
    status,
    target_temp,
    target_moisture,
    target_light,
    created_at,
  }) {
    try {
      const sql = `INSERT INTO auto_status (device_id, status, target_temp, target_moisture, target_light, created_at)
      VALUES (${this.pool.escape(device_id)}, ${this.pool.escape(
        status
      )}, ${this.pool.escape(target_temp)}, ${this.pool.escape(
        target_moisture
      )}, ${this.pool.escape(target_light)}, ${this.pool.escape(created_at)})
      ON DUPLICATE KEY UPDATE status = ${status}, target_temp = ${target_temp}, target_moisture = ${target_moisture}, target_light = ${target_light}, created_at = ${created_at};`;
      const rows = await this.pool.query(sql);
      return rows;
    } catch (err) {
      res.status(500).json({ message: 'Database Error' });
      console.log(err.message);
    }
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
    try {
      const sql = `INSERT INTO actuator_config 
      idx, device_id, pump, led, fan, peltier, created_at) VALUES (?,?,?,?,?,?,?)`;
      const fields = [idx, device_id, pump, led, fan, peltier, created_at];
      const rows = await this.pool.query(sql, fields);
      return rows;
    } catch (err) {
      res.status(500).json({ message: 'Database Error' });
      console.log(err);
    }
  }

  // 자동 제어 상태 저장
  async insertAutoStatus({
    device_id,
    status,
    target_temp,
    target_moisture,
    target_light,
  }) {
    const currentDate = new Date();
    const koreaOffset = 9 * 60; // 한국 표준시 UTC+9의 오프셋 (분 단위)
    currentDate.setMinutes(currentDate.getMinutes() + koreaOffset); // 현재 시간에 한국 표준시 오프셋을 추가

    const formattedCreatedAt = currentDate
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    const sql = `INSERT INTO auto_status (device_id, status, target_temp, target_moisture, target_light, created_at)
    VALUES (${this.pool.escape(device_id)}, ${this.pool.escape(
      status
    )}, ${this.pool.escape(target_temp)}, ${this.pool.escape(
      target_moisture
    )}, ${this.pool.escape(target_light)}, '${formattedCreatedAt}')
    ON DUPLICATE KEY UPDATE status = ${status}, target_temp = ${target_temp}, target_moisture = ${target_moisture}, target_light = ${target_light}, created_at = '${formattedCreatedAt}';`;

    const [rows] = await this.pool.query(sql);
    return rows;
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
  idx, device_id, pump, led, fan, peltier, created_at) VALUES (?,?,?,?,?,?,?)`;
    const row = await this.pool.query(sql, [
      idx,
      device_id,
      pump,
      led,
      fan,
      peltier,
      created_at,
    ]);
    return row;
  }

  // 유저 데이터 저장
  async insertUser({
    id,
    password,
    phone,
    email,
    fullname,
    picture,
    device_id,
    created_at,
  }) {
    const sql = `INSERT INTO users
  (id, password, phone, email, fullname, picture, device_id, created_at) VALUES (?,?,?,?,?,?,?,?)`;
    const row = await this.pool.query(sql, [
      id,
      password,
      phone,
      email,
      fullname,
      picture,
      device_id,
      created_at,
    ]);

    return { row };
  }

  async deviceCheck(device_id) {
    try {
      const sql = 'SELECT * FROM devices WHERE device_id = ?';
      const row = await this.pool.query(sql, [device_id]);
      return row;
    } catch (err) {
      res.status(500).json({ message: 'Database Error' });
      console.log(err);
    }
  }

  async insertDevice({ device_id, device_macAddress, device_type, picture }) {
    const sql =
      'INSERT INTO devices(device_id,device_macAddress,device_type, picture) VALUES (?,?,?,?)';
    const row = await this.pool.query(sql, [
      device_id,
      device_macAddress,
      device_type,
      picture,
    ]);
    return { row };
  }
}
