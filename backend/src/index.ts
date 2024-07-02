import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import conversationsRoutes from './routes/conversation.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationsRoutes);

app.listen(PORT, () => {
  console.log(`Server started on the port ${PORT}`);
});
