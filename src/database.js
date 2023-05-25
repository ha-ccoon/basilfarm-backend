import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

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
  }

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
    try {
      const sql = `INSERT INTO user
      (id, password, phone, email, fullname, picture, device_id, created_at) VALUES (?,?,?,?,?,?,?,?)`;
      const fields = [
        id,
        password,
        phone,
        email,
        fullname,
        picture,
        device_id,
        created_at,
      ];
      const rows = await this.pool.query(sql, fields);
      return rows;
    } catch (err) {
      res.status(500).json({ message: 'Database Error' });
      console.log(err);
    }
  }

  async deviceCheck(device_id) {
    try {
      const sql = 'SELECT * FROM device WHERE device_id = ?';
      const rows = await this.pool.query(sql, [device_id]);
      return rows;
    } catch (err) {
      res.status(500).json({ message: 'Database Error' });
      console.log(err);
    }
  }

  async insertDevice({ device_id, device_macAddress, device_type, picture }) {
    try {
      const sql =
        'INSERT INTO device(device_id,device_macAddress,device_type, picture) VALUES (?,?,?,?)';
      const fields = [device_id, device_macAddress, device_type, picture];
      const rows = await this.pool.query(sql, fields);
      return rows;
    } catch (err) {
      res.status(500).json({ message: 'Database Error' });
      console.log(err);
    }
  }
}
