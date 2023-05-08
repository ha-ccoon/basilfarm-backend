import mysql from 'mysql2/promise';

export default class insertDB {
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

  async sensorData({
    idx,
    device_id,
    temp,
    humidity,
    light,
    water_level,
    moisture,
    created_at,
  }) {
    const sensor_sql = `INSERT INTO sensor_history 
    (idx, device_id, temp, humidity, light, water_level, moisture, created_at) values (?,?,?,?,?,?,?,?)`;
    const realtime_sql = `INSERT INTO realtime 
    (device_id, temp, humidity, light, water_level, moisture, created_at) 
    values (?,?,?,?,?,?,?) 
    ON DUPLICATE KEY UPDATE 
    temp=VALUES(temp), humidity=VALUES(humidity), light=VALUES(light), 
    water_level=VALUES(water_level), moisture=VALUES(moisture), created_at=VALUES(created_at)`;
    const row1 = await this.pool.query(sensor_sql, [
      idx,
      device_id,
      temp,
      humidity,
      light,
      water_level,
      moisture,
      created_at,
    ]);
    const row2 = await this.pool.query(realtime_sql, [
      device_id,
      temp,
      humidity,
      light,
      water_level,
      moisture,
      created_at,
    ]);
    return { row1, row2 };
  }
}