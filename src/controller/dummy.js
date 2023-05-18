// import { getDBConnection } from '../app.js';

export const createData = () => {
  let data = [];
  for (let i = 0; i <= 5; i++) {
    data.push({
      idx: i,
      device_id: 'unit003',
      temp: Math.floor(Math.random() * (30 - 15 + 1)) + 15,
      humidity: Math.floor(Math.random() * (90 - 40 + 1)) + 40,
      light: Math.floor(Math.random() * (30000 - 3000 + 1)) + 3000,
      moisture: Math.floor(Math.random() * (2300 - 500 + 1)) + 500,
      water_level: Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000,
      created_at: 1682726800000 + i * 60000,
    });
  }
  return data;
};

createData();
