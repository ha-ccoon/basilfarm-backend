import DB from "../dbconfig.js";

const db = new DB();

  export const getRealtimeDataByDeviceId = async (req, res) => {
    try {
      const data = await db.getData(); // 데이터 조회
      res.json(data); // JSON 형태로 응답
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  };
  