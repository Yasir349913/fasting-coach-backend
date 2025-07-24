require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const connectDb = require('./config/db');

const adminAuthRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentplanRoutes = require('./routes/paymentPlanRoutes');
const twilloRoutes = require('./routes/twilioRoutes');

// Middlewares
const app = express();
let PORT = process.env.PORT || 5000;

app.use(morgan('tiny'));
app.use('/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

app.use(
  cors({
    origin: '*',
  })
);

// Routes
app.get('/', (req, res) => {
  res.send('Fasting Coach Backend Running...');
});

app.use('/v1/auth', adminAuthRoutes);
app.use('/v1/reviews', reviewRoutes);
app.use('/v1/payment-plans', paymentplanRoutes);
app.use('/v1/twilio', twilloRoutes);

// Start Server
let start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
