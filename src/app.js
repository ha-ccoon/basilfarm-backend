import express from "express";
import dotenv from "dotenv";
import apiRouter from "./routes/index.js";
import DB from "./dbconfig.js";
import MqttSetup from "./mqtt-client/mqtt-client.js";
import messageCallback from "./mqtt-client/mqtt-controller.js";
import cors from "cors";

dotenv.config();

const app = express();
const corsOptions = {
  origin: '*'
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use("/api", apiRouter);

// 정적 경로 설정
app.use("/static", express.static("uploads"));

// 포트 연결
const port = parseInt(process.env.PORT ?? "8080");

app.listen(port, () => {
  console.log(`🚀 서버가 포트 ${port}에서 운영중입니다.`);
});

// MQTT connection
const mqttOptions = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

const mqttClient = new MqttSetup(mqttOptions, ["data/unit002/#"]);
mqttClient.connect();
mqttClient.subscribe();
mqttClient.receiveMessage(messageCallback);

// MySQL connection 실행
function getDBConnection() {
  const db = new DB();
  return db;
}

export default getDBConnection;
