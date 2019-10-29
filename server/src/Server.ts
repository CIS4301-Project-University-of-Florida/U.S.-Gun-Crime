import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import BaseRouter from './routes';

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', BaseRouter);

// Export express instance
export default app;
