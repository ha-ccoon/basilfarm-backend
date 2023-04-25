import express from "express";

const sensorRouter = express.Router();

sensorRouter.get("/", (req, res) => {
  res.json({message: "This is Sensor!"});
  console.log("sensor 로드");
});

export default sensorRouter;