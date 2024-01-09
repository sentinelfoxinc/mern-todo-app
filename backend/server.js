import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import taskRouter from './routes/taskRoute.js';
import forgotPasswordRouter from './routes/forgotPassword.js';


import promMid from 'express-prometheus-middleware';


// const PORT = 80;


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
mongoose.set('strictQuery', true);

app.use(promMid({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}));

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.error('DB Connection Error:', err);
  });

  
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/forgotPassword', forgotPasswordRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((req, res, next) => {
  res.status(200).json({ message: 'Success' });
});




app.listen(port, () => console.log(`Listening on localhost:${port}`));
