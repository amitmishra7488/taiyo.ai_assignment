const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
    },
    email: {
      type: String,
      unique: true,
    },
  });
  
  const contactModel = mongoose.model('Contact', contactSchema);

  module.exports = contactModel;
