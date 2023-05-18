import { getDBConnection } from '../app.js';

export const createData = (count) => {
  let data = [];
  for (let i = 1; i <= count; i++) {
    data.push([
      i,
      'unit003',
      Math.floor(Math.random() * (30 - 15 + 1)) + 15,
      Math.floor(Math.random() * (90 - 40 + 1)) + 40,
      Math.floor(Math.random() * (30000 - 3000 + 1)) + 3000,
      Math.floor(Math.random() * (2300 - 500 + 1)) + 500,
      Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000,
      1682726800000 + i * 60000,
    ]);
  }
  return data;
};

// 배치 삽입
const batchInsert = (data) => {
  try {
    const db = getDBConnection();
    db.insertData(data);
  } catch (err) {
    console.log(err);
  }
};

export const generateData = (req, res) => {
  const data = createData(10080); // 데이터 생성
  batchInsert(data); // 배치 삽입 실행

  res.json({ message: 'generate data error' });
};
