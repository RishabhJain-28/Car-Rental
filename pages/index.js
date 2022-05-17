import Carousel from '../components/Home/Carousel';
import { Box, Grid, Paper } from '@material-ui/core';
import CarSection from '../components/Home/CarSection';
import OfferImage from '../components/Home/OfferImage';
import { useBookingContext } from '../utils/context/bookingContext';
import { useQuery } from 'react-query';
import axios from '../utils/axios';
import Booker from '../components/booker/booker';
export default function Home() {
  // const {
  //   data: { products },
  // } = useQuery(
  //   'products',
  //   () => axios.get('http://localhost:5000/api/product/list').then((res) => res.data.body),
  //   {
  //     initialData: [],
  //   },
  // );
  const { cars, showAvailable } = useBookingContext();

  return (
    <>
      <Box mt={'2rem'} mb={'2rem'}>
        <Grid container spacing={0} justify="center">
          <Carousel />
        </Grid>
        <Grid container spacing={0} justify="center">
          <Booker />
        </Grid>
        <Grid
          container
          spacing={0}
          justify="center"
          style={{
            marginTop: '1rem',
          }}
        >
          <Grid item lg={10}>
            {cars.length !== 0 && (
              <CarSection cars={cars} title={'Available cars'} scrollKey={'available_cars'} />
            )}
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          justify="space-evenly"
          style={{ marginTop: '1rem', padding: '0 3rem 0 3rem' }}
        >
          <Grid item lg={3}>
            <OfferImage />
          </Grid>
          <Grid item lg={3}>
            <OfferImage />
          </Grid>
          <Grid item lg={3}>
            <OfferImage />
          </Grid>
        </Grid>
        <Grid container spacing={0} justify="center" style={{ marginTop: '1rem' }}></Grid>
      </Box>
    </>
  );
}
