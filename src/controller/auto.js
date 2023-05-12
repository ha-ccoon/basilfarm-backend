import DB from '../database.js';
import { mqttClient } from '../app.js';

const db = new DB();
let intervalId;

// 자동 제어 요청 저장하기
const saveAutoStatus = async (req, res) => {
  const { device_id } = req.params;
  const { status, target_temp, target_moisture } = req.body;
  try {
    await db.insertAutoStatus({
      device_id: device_id,
      status,
      target_temp,
      target_moisture,
      created_at: new Date(),
    });
    res.status(200).send('자동화 명령이 저장되었습니다.');
  } catch (err) {
    console.error(err);
  }
};

// 자동 제어 상태 가져오기
const getAutoManagementStatus = async (req, res) => {
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

const autoManagement = async (req, res) => {
  const { device_id } = req.params;
  const { status, target_temp, target_moisture } = req.body;

  if (status === '1') {
    intervalId = startAutoManagement(device_id, target_temp, target_moisture);
    res.status(200).send('자동화 명령이 디바이스로 전송되었습니다.');
  } else if (status === '0') {
    stopAutoManagement(intervalId, device_id);
    res.status(200).send('자동화 명령이 해제되었습니다.');
  } else {
    res.status(400).send('잘못된 요청입니다.');
  }
};

// 자동 제어 함수
async function startAutoManagement(device_id, target_temp, target_moisture) {
  const db = new DB();
  mqttClient.connect();

  const intervalId = setInterval(async () => {
    try {
      const [row] = await db.pool.query('SELECT temp, moisture FROM sensor_history WHERE device_id = ? ORDER BY time DESC LIMIT 1', [device_id]);

      const { temp, moisture } = row;
      const tempInt = parseInt(temp);

      // 엑추에이터 자동 제어
      const peltier = (tempInt < target_temp) ? 1 : (tempInt > target_temp) ? 2 : 0;
      const fan = (tempInt <= target_temp || moisture <= target_moisture) ? 'run' : 'stop';
      const pump = (moisture < target_moisture) ? 'run' : (moisture > target_moisture) ? 'stop' : '';

      // 추후 디바이스 작동 코드 작성 예정
      mqttClient.sendCommand(`auto/${device_id}`, {
        device_id,
        peltier,
        fan,
        pump,
        fan
      });
      console.log(`Device ${device_id} 자동 제어 중: ${temp}°C, ${moisture}%`);
      console.log(`peltier: ${peltier}, fan: ${fan}, pump: ${pump}, fan: ${fan}`);
    } catch (err) {
      console.error(err);
    }
  }, 60 * 1000);
  return intervalId;
}

// 자동 제어 함수 종료 함수
function stopAutoManagement(intervalId, device_id) {
  clearInterval(intervalId);
  console.log(`Device ${device_id} 자동 제어 종료`);
}

export { saveAutoStatus, autoManagement, getAutoManagementStatus };