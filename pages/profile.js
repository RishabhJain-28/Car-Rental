import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, makeStyles, Paper } from '@material-ui/core';

import UserInfo from '../components/Profile/UserInfo';

const useStyles = makeStyles((theme) => ({
  main: {
    padding: '2rem',
  },
  carouselContainer: {
    display: 'flex',
    flexDirection: 'column',
    // alignSelf: 'flex-start',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: '1rem 0 1rem 0',
    justifyContent: 'space-between',
  },
  buyNowBtn: {
    backgroundColor: '#fb641b',
    color: '#fff',
    flexGrow: '1',
    maxWidth: '48%',
    '&:hover': {
      backgroundColor: '#fb641b',
    },
  },
  cartBtn: {
    backgroundColor: '#ff9f00',
    color: '#fff',
    flexGrow: '1',
    maxWidth: '48%',
    '&:hover': {
      backgroundColor: '#ff9f00',
    },
  },
  productTitle: {
    color: '#212121',
    fontSize: '20px',
    fontWeight: '400',
    lineHeight: '1.4',
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  ratingCard: {
    borderRadius: '5px',
    backgroundColor: '#388e3c',
    display: 'flex',
    flexDirection: 'row',
    padding: '2px 4px 2px 6px',
    color: '#fff',
  },
  ratingText: {
    fontSize: '0.8rem',
    lineHeight: '1rem',
    alignSelf: 'center',
  },
  starIcon: {
    fontSize: '0.8rem',
    margin: 'auto 0 auto 0',
    alignSelf: 'center',
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 'fit-content',
    padding: '0.5rem 0 0.5rem 0',
  },
  no: {
    color: '#878787',
    paddingLeft: '8px',
    fontSize: '0.9rem',
    alignSelf: 'center',
  },
  primaryText: {
    fontSize: '28px',
    fontWeight: '500',
    color: '#212121',
    lineHeight: 1.4,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  key: {
    color: '#878787',
    fontSize: '0.9rem',
    fontWeight: '500',
    alignSelf: 'center',
    margin: '0 3rem 0 0',
    minWidth: '70px',
  },
  img: {
    height: '64px',
    width: '64px',
    border: '2px solid #f0f0f0',
    objectFit: 'contain',
    margin: '0 1rem 0 0',
  },
  deliveryContainer: {
    margin: '0 0 1rem 0',
  },
  btnOutlined: {
    border: '1px solid #000',
    color: '#000',
    borderRadius: '5px',
    margin: '0 1rem 0 0',
    transition: 'ease-out 0.3s',
    '&:before': {
      width: '0%',
      height: '100%',
      top: '0',
      left: '0',
    },
    '&:hover': {
      boxShadow: 'inset 400px 0 0 0 #000',
      color: '#fff',
    },
  },
  btnActive: {
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '5px',
    margin: '0 1rem 0 0',
    '&:hover': {
      backgroundColor: '#000',
      boxShadow: '0 4px 12px 0 rgb(0 0 0 / 30%)',
    },
  },
  description: {
    lineHeight: '1.5em',
    color: '#212121',
    fontSize: '14px',
    margin: 0,
  },
  sticky: {
    position: 'sticky',
    top: '80px',
  },
}));
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import OrdersTable from '../components/pastOrders/pastOrder';
import axios from '../utils/axios';

const Profile = () => {
  const classes = useStyles();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);

    const { data } = await axios.get('/bookCar/my');

    console.log(data);
    setOrders(data);
    setLoading(false);
  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box mr={'6rem'} ml={'6rem'}>
        <Paper elevation={0} className={classes.main}>
          <Grid container spacing={2}>
            <Grid item lg={12} className={classes.carouselContainer}>
              <UserInfo />
            </Grid>
            <Grid item lg={12} className={classes.descriptionContainer}>
              <Paper square>
                <Tabs
                  value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChange}
                  aria-label="disabled tabs example"
                >
                  <Tab label="Orders" />
                </Tabs>

                <OrdersTable orders={orders} loading={loading} />
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Profile;
