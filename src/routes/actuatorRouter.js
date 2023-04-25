import express from 'express';

const actuatorRouter = express.Router();

actuatorRouter.get("/", (req, res) => {
  res.json({message: "This is Actuator!"});
  console.log("actuator 로드");
});

export default actuatorRouter;