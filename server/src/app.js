import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import express from 'express';
const app = express();
import cors from 'cors';
import UserRoutes from './routes/user.routes.js';

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));

app.use(
  cors({
    origin: '*',
  })
);

app.use('/api/users', UserRoutes);

export { app };
