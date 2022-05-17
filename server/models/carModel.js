const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    name: String,
    // description: String,
    images: [String],

    location: String,
    to: Date,
    from: Date,
    type: String,
    price: Number,
    rating: Number,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
