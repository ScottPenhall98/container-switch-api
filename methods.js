import express from 'express';
import containerMethods from "./containerMethods.js";

const router = express.Router()

router.get('/status', containerMethods.checkStatus);
router.get('/start', containerMethods.startContainer);
router.get('/stop', containerMethods.stopContainer);

export default router;