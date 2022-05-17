import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../axios';
import moment from 'moment';
const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [showAvailable, setShowAvailable] = useState(false);
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [car, setCar] = useState('');
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);
  const [order, setOrder] = useState({});

  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [payment, setPayment] = useState({
    cardName: '',
    cardNum: '',
    expDate: '',
    cvv: '',
    cardType: '',
  });

  function showCars() {
    if (location && type && from && to) {
      setShowAvailable(true);
    }
  }

  async function bookCar() {
    try {
      setBookLoading(true);
      console.log('bookin');
      let duration = Math.round(moment(to).diff(moment(from)) / (60 * 60 * 24 * 1000));
      duration = duration == 0 ? 1 : duration;
      const [choice] = cars.filter((c) => {
        console.log(c._id);
        return c._id == car;
      });
      console.log('bookin');
      console.log(choice);
      const { data } = await axios.post('/bookCar', {
        shipping,
        payment,
        carId: car,
        location,
        type,
        from,
        to,
        total: duration * choice.price,
      });

      setBookLoading(false);
      setCar('');
      setOrder(data);
      console.log('order: ', data);
    } catch (err) {
      console.log(err);
      setBookLoading(false);
      setCar('');
    }
  }

  async function fetchCars() {
    setLoading(true);
    console.log(`/car/${location}/${type}/${from}/${to}`);
    const { data } = await axios.get(`/car/${location}/${type}/${from}/${to}`);
    console.log(data);

    setCars(data);
    if (data.length == 0) alert('No cars available');
    setLoading(false);
  }

  useEffect(() => {
    // console.log(typeof from.toString());
  }, [from]);

  return (
    <BookingContext.Provider
      value={{
        showAvailable,
        setShowAvailable,
        showCars,
        type,
        setType,
        from,
        setFrom,
        to,
        setTo,
        location,
        setLocation,
        fetchCars,
        cars,
        setCars,
        loading,
        shipping,
        setShipping,
        payment,
        setPayment,
        car,
        setCar,
        bookLoading,
        setBookLoading,
        bookCar,
        order,
        setOrder,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

function useBookingContext() {
  return useContext(BookingContext);
}

export { BookingContext, BookingProvider, useBookingContext };
