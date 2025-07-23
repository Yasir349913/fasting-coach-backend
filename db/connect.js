const mongoose = require('mongoose');

const connectDb = (MONGO_URI) => {
  return mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to Database');
  });
};

module.exports = connectDb;
