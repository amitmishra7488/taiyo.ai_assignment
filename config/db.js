const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Taiyo.Ai Assignment Database Connected');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };

  
  module.exports = connectDB;
