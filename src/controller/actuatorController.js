import db from "../dbconfig.js";

export const getActuatorData = async (req, res) => {
  try {
    const [rows] = await db.pool.query("SELECT * FROM actuator_config");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getActuatorDataByDeviceId = async (req, res) => {
  const { device_id } = req.params;
  try {
    const [rows] = await db.pool.query(
      "SELECT * FROM actuator_config WHERE device_id = ?",
      [device_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const postPumpData = async (req, res) => {
  const { device_id } = req.params;
  const { pump } = req.body;
  try {
    const [rows] = await db.pool.query(
      "INSERT INTO actuator_config (device_id, pump, created_at) VALUES (?, ?, ?)",
      [device_id, pump, created_at]
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const postLedData = async (req, res) => {
  const { device_id } = req.params;
  try {
    const [rows] = await db.pool.query(
      "INSERT INTO actuator_config (device_id, led, created_at) VALUES (?, ?, ?)",
      [device_id, led, created_at]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const postFanData = async (req, res) => {
  const { device_id } = req.params;
  try {
    const [rows] = await db.pool.query(
      "INSERT INTO actuator_config (device_id, fan, created_at) VALUES (?, ?, ?)",
      [device_id, fan, created_at]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
