import db from "../dbconfig.js";

export const getSensorData = async (req, res) => {
  try {
    const [rows] = await db.pool.query("SELECT * FROM sensor_history");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getSensorDataByDeviceId = async (req, res) => {
  const { device_id } = req.params;
  try {
    const [rows] = await db.pool.query(
      "SELECT * FROM sensor_history WHERE device_id = ?",
      [device_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
