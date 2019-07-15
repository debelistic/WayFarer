/* eslint-disable no-console */
import express from 'express';
import { config } from 'dotenv';
import userRoutes from './routes/userRoutes';
import tripsRoutes from './routes/tripsRoutes';
import bookingsRoutes from './routes/bookingsRoutes';
import busesRoutes from './routes/busesRoutes';


const app = express();

config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', userRoutes);
app.use('/api/v1', tripsRoutes);
app.use('/api/v1', bookingsRoutes);
app.use('/api/v1', busesRoutes);


// CORS Headers Access
app.use((req, res, next) => {
  req.header('Access-Controll-Allow-Origin', '*');
  req.header(
    'Access-Controll-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  return next();
});

// Routes
app.get('/', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'Welcome to Way Farer',
  });
});
app.use('/api/v1', userRoutes);

// Error handler middlewares
app.use((req, res, next) => {
  const error = new Error('Your request could not be found');
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const { message } = error;
  res.status(error.status || 500).send({
    status: 'error',
    message,
  });
});

const port = process.env.PORT;


app.listen(port, () => {
  console.log('App is running on', port);
});

export default app;
