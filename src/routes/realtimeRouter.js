import express from 'express';

const RealtimeRouter = express.Router();
RealtimeRouter.get('/:device_id');

export default RealtimeRouter;