import express from "express";
import actuatorRouter from "./actuatorRouter.js";
import sensorRouter from "./sensorRouter.js";

const router = express.Router();

router.use("/actuator", actuatorRouter);
router.use("/sensor", sensorRouter);


export default router;