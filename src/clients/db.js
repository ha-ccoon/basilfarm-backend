import mysql from 'mysql2/promise';

class DB {
  constructor({ 
    host,
    user,
    password,
    database
  }) {
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
    const [rows] = await this.promisePool.query(sql, [
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
