import DB from '../database.js';
import { mqttClient } from '../app.js';

const db = new DB();
const setIntervalMap = new Map();

// 자동 제어 상태 가져오기
const currentAutoManagementStatus = async (req, res) => {
  const { device_id } = req.params;
  const query = `SELECT * FROM auto_status WHERE device_id = ?`;

  try {
    const [row] = await db.pool.query(query, [device_id]);
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 자동 제어 요청 저장하기
const saveAutoStatus = async (req, res, next) => {
  const { device_id } = req.params;
  const { status, target_temp, target_moisture, target_light } = req.body;
  try {
    await db.insertAutoStatus({
      device_id: device_id,
      status,
      target_temp,
      target_moisture,
      target_light,
      created_at: new Date(),
    });
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('자동화 명령 저장에 실패하였습니다.');
  }
};

// 자동화 ON/OFF 구분 후 시행
const autoManagement = async (req, res) => {
  const { device_id } = req.params;
  const { status, target_temp, target_moisture, target_light } = req.body;

  if (status === 1) {
    startAutoManagement(device_id, target_temp, target_moisture, target_light);
    res.status(200).send('자동화 명령이 디바이스로 전송되었습니다.');
  } else if (status === 0) {
    stopAutoManagement(device_id);
    res.status(200).send('자동화 명령이 해제되었습니다.');
  } else {
    res.status(400).send('잘못된 요청입니다.');
  }
};

// 자동 제어 함수
async function startAutoManagement(device_id, target_temp, target_moisture, target_light) {
  mqttClient.connect();

  let peltier;
  let fan;
  let pump;
  let led;

  async function autoControl() {
    console.log('자동 제어 실행');
    try {
      const [row] = await db.pool.query('SELECT temp, moisture, light FROM sensor_history WHERE device_id = ? ORDER BY created_at DESC LIMIT 1', [device_id]);

      const { temp, moisture, light } = row[0];
      const tempInt = parseInt(temp);

      // 엑추에이터 자동 제어
      if (tempInt < target_temp) {
        peltier = "1";
      } else if (tempInt > target_temp) {
        peltier = "2";
      } else {
        peltier = "0";
      }

      if (tempInt <= target_temp || moisture <= target_moisture) {
        fan = "1";
      } else {
        fan = "0";
      }

      if (moisture < target_moisture) {
        pump = "1";
      } else if (moisture > target_moisture) {
        pump = "0";
      } else {
        pump = "0";
      }

      if (light < target_light) {
        led = "1";
      }

      // 서버 > 디바이스 명령 전송
      mqttClient.sendCommand(`cmd/${device_id}/auto`, {
        device_id,
        peltier,
        fan,
        pump,
        led
      });
      console.log(`Device ${device_id} 자동 제어 중: ${target_temp}°C, ${target_moisture}%, ${target_light}lux`);
      console.log(`peltier: ${peltier}, fan: ${fan}, pump: ${pump}, led: ${led}`);
    } catch (err) {
      console.error(err);
    }
  }

  // 최초 실행
  await autoControl();

  // 1분 주기 실행
  const intervalId = setInterval(autoControl, 60 * 1000);
  setIntervalMap.set(device_id, intervalId);
}

// 자동 제어 함수 종료 함수
function stopAutoManagement(device_id) {
  const foundInterval = setIntervalMap.get(device_id);
  if (foundInterval) {
    clearInterval(foundInterval);
    setIntervalMap.delete(device_id);
    mqttClient.sendCommand(`cmd/${device_id}/auto`, {
    device_id,
    peltier: "0",
    fan: "0",
    pump: "0",
    led: "0"
    });
    console.log(`Device ${device_id} 자동 제어 종료`);
  }
}

export { autoManagement, saveAutoStatus, currentAutoManagementStatus };