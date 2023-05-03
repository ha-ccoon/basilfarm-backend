import express from "express";
import actuatorRouter from "./actuatorRouter.js";
import sensorRouter from "./sensorRouter.js";
import realtimeRouter from "./realtimeRouter.js";

const router = express.Router();

router.use("/realtime", realtimeRouter);
router.use("/sensors", sensorRouter);
router.use("/actuators", actuatorRouter);
router.use("/actuators/pump", actuatorRouter);
router.use("/actuators/led", actuatorRouter);
router.use("/actuators/fan", actuatorRouter);

export default router;