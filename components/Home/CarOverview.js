import React from 'react';
import { IconButton, makeStyles, Paper } from '@material-ui/core';
import { Star, Favorite } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useBookingContext } from '../../utils/context/bookingContext';
const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
    position: 'relative',
    height: '290px',
    width: '190px',
    minWidth: '190px',
    margin: '0 1rem 0 1rem',
    cursor: 'pointer',
    transition: 'all 0.1s ease-in-out',
    '&:hover': {
      '& p': {
        color: '#2874f0',
      },
      '& img': {
        transform: 'scale(1.05)',
      },
    },
  },
  img: {
    width: '160px',
    height: '150px',
    objectFit: 'contain',
    alignSelf: 'center',
  },
  itemName: {
    fontSize: '0.9rem',
    textDecoration: 'none',
    padding: '0 0.5rem 0 0',
    textAlign: 'left',
    cursor: 'pointer',
    marginBottom: '1px',
  },
  itemType: {
    marginTop: '1px',
    fontSize: '0.9rem',
    textDecoration: 'none',
    // padding: '0 0.5rem 0 0',
    textAlign: 'left',
    cursor: 'pointer',
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 'fit-content',
    alignSelf: 'center',
    padding: '0 1rem 0 0',
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
  no: {
    color: '#878787',
    paddingLeft: '8px',
    fontSize: '0.9rem',
    alignSelf: 'center',
  },
  priceContainer: {
    maxWidth: '100%',
    alignSelf: 'center',
    marginTop: '0.5rem',
  },
  price: {
    fontWeight: '500',
  },
  wishListBtn: {
    position: 'absolute',
    right: -10,
    top: -10,
    '& svg': {
      fontSize: '0.8rem',
      color: '#c8c8c8',
    },
  },
}));

const CarOverview = ({ car }) => {
  const classes = useStyles();
  const router = useRouter();
  const { setCar } = useBookingContext();

  // const ;
  return (
    <div id="test!!" className={classes.card}>
      <div
        onClick={() => {
          router.push(`/book/${car._id}`);
          setCar(car._id);
        }}
      >
        <img src="/car.jpg" alt="prduct-img" className={classes.img} />
        <h4 className={classes.itemName}>{car.name}</h4>
        <h4 className={classes.itemType}>{car.type}</h4>
        <div className={classes.ratingContainer}>
          <Paper elevation={0} className={classes.ratingCard}>
            <span className={classes.ratingText}>{car.rating}</span>
            <span>
              <Star className={classes.starIcon} />
            </span>
          </Paper>
        </div>
        <div className={classes.priceContainer}>
          <span className={classes.price}>₹{car.price}/ day</span>
        </div>
      </div>
    </div>
  );
};

export default CarOverview;
