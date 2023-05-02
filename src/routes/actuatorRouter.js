import express from 'express';

const actuatorRouter = express.Router();

actuatorRouter.get("/", (req, res) => {
  res.json({message: "This is Actuator!"});
  console.log("actuator 로드");
});

actuatorRouter.get("/pump", (req, res) => {
  res.json({message: "Control pump!"});
  console.log("펌프 제어 로드");
});

actuatorRouter.get("/led", (req, res) => {
  res.json({message: "Control led!"});
  console.log("led 제어 로드");
});

actuatorRouter.get("/fan", (req, res) => {
  res.json({message: "Control fan"});
  console.log("환기팬 제어 로드");
});

export default actuatorRouter;