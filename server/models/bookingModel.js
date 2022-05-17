const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    shipping: {
      firstName: String,
      lastName: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    payment: {
      cardName: String,
      carNum: String,
      expDate: String,
      cvv: String,
      cardType: String,
    },

    location: String,
    to: Date,
    from: Date,
    total: Number,
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
