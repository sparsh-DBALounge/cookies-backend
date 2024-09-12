import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
import cors from 'cors';
import morgan from 'morgan';

// Port Setup
const PORT = process.env.PORT || 8080;

const app = express();

// Middlewares

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Set-up routes
app.use('/api/auth', userRouter);

// Listen to server Connection
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
