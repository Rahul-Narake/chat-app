import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import {
  getAllconversations,
  getMessages,
  sendMessage,
} from '../controllers/conversation.controller.js';
const router = express.Router();

router.post('/send/:id', protectRoute, sendMessage);
router.get('/', protectRoute, getAllconversations);
router.get('/:id', protectRoute, getMessages);
export default router;
