const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const { connectDb, env } = require('./config/index');
const routes = require('./routes/index');

const app = express();

// Middlewares
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
app.use('/v1', routes);

module.exports = app;
