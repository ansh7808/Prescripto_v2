
import express from 'express';
const chatRouter = express.Router();
import {chatWithBot} from '../controllers/chatController.js'

chatRouter.post("/chat",chatWithBot);

export default chatRouter;
