import mysql from 'mysql2/promise';

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

  // 유저 데이터 저장
  async saveUser({
    id,
    password,
    phone,
    email,
    fullname,
    picture,
    created_at,
  }) {
    const sql = `INSERT INTO user
  (id, password, phone, email, fullname, picture, created_at) VALUES (?,?,?,?,?,?,?)`;
    const row = await this.pool.query(sql, [
      id,
      password,
      phone,
      email,
      fullname,
      picture,
      created_at,
    ]);

    return { row };
  }
}
