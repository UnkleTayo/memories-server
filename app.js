import express from 'express';
import cors from 'cors';
import { AppError } from './utils/appErrorHandler.js';

import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  })
);

// setup routes
app.use('/posts', postRoutes);
app.use('/user', authRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

export { app };
