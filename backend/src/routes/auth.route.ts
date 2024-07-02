import express from 'express';
import {
  getCurrentUser,
  login,
  logout,
  signup,
} from '../controllers/auth.controller.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);
router.get('/currentUser', protectRoute, getCurrentUser);

export default router;
