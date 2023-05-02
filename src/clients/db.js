import mysql from 'mysql2/promise';

export const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

class DB {
  constructor({ host, user, password, database }) {
    this.pool = mysql.createPool({
      host,
      user,
      password,
      database,
      maxIdle: 10,
      idleTimeout: 60000,
    });
  }
  async insertData({
    idx,
    device_id,
    temp,
    humidity,
    light,
    moisture,
    created_at,
  }) {
    const sql = `INSERT INTO sensor_history 
    (idx, device_id, temp, humidity, light, moisture, created_at) values (?,?,?,?,?,?,?)`;
    const rows = await this.pool.query(sql, [
      idx,
      device_id,
      temp,
      humidity,
      light,
      moisture,
      created_at,
    ]);

    return rows;
  }
}

export default DB;
