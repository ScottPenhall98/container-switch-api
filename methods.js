import express from 'express';
import containerMethods from "./containerMethods.js";

const router = express.Router()

router.get('/data', containerMethods.getData);

export default router;