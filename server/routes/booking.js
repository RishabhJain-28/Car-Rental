const router = require('express').Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const Booking = require('../models/bookingModel');

// * add booking to db
router.post('/', isAuthenticated, async (req, res) => {
  let { total, location, type, from, to, carId, shipping, payment } = req.body;

  // console.log(req.body);

  // return res.send('adsd');

  location = location.toLowerCase();
  type = type.toLowerCase();

  const booking = new Booking({
    location,
    type,
    from: new Date(from),
    to: new Date(to),
    userId: req.user._id,
    carId: carId,
    shipping,
    payment,
    total,
    // date: new Date(),
  });
  console.log(booking);
  await booking.save();
  return res.send(booking);
});

router.get('/my', isAuthenticated, async (req, res) => {
  console.log(req.user._id);
  const bookings = await Booking.find({ userId: req.user._id }).populate('carId');

  console.log(bookings);

  return res.send(bookings);
});

module.exports = router;
