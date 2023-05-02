import express from "express";

const realtimeRouter = express.Router();

realtimeRouter.get("/", (req, res) => {
  res.json({message: "Realtime data!"});
  console.log("Realtime 로드");
});

export default realtimeRouter;