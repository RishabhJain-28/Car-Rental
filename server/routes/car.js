const router = require('express').Router();
const Car = require('../models/carModel');

router.get('/:location/:type/:from/:to', async (req, res) => {
  const { location, type, from, to } = req.params;

  const cars = await Car.find({
    type: type.toLowerCase(),
    location: location.toLowerCase(),

    from: { $lte: from },
    to: { $gte: to },
  });

  // const

  // await car.save();
  console.log(cars);
  console.log('------');

  return res.send(cars);
});

// * add car to db
router.get('add/:location/:type/:from/:to', async (req, res) => {
  let { location, type, from, to } = req.params;
  location = location.toLowerCase();
  type = type.toLowerCase();

  const car = new Car({
    name: 'CAr ABC',
    images: ['./abc'],
    location,
    type,
    rating: 4.3,
    price: 124,
    from: new Date(from),
    to: new Date(to),
  });

  await car.save();
  console.log(car);

  return res.send(car);
});

module.exports = router;
