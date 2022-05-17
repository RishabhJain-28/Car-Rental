import React from 'react';
import { Button, Divider, makeStyles, Paper } from '@material-ui/core';
import CarOverview from './CarOverview';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0px',
    position: 'relative',
    borderTop: '1px solid #eaeaea',
    boxShadow: '0 2px 4px 0 rgb(0 0 0 / 8%)',
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0.2rem 1rem 0.2rem 1rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& h2': {
      fontWeight: '500',
      fontSize: '22px',
      lineHeight: '32px',
    },
    '& button': {
      backgroundColor: '#000',
      height: 'fit-content',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#000',
        boxShadow: '0 4px 12px 0 rgb(0 0 0 / 30%)',
      },
    },
  },
  showcase: {
    overflow: 'hidden',
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'stretch',
    padding: '1rem 1rem 1rem 1rem',
    scrollBehavior: 'smooth',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    top: 'calc(50% - 52px)',
    backgroundColor: 'hsla(0,0%,100%,.98)',
    boxShadow: '1px 2px 10px -1px rgb(0 0 0 / 30%)',
    height: '104px',
    width: '47px',
    borderBottomRightRadius: '4px',
    borderTopRightRadius: '4px',
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    border: '1px solid transparent',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
  },
  nextBtn: {
    position: 'absolute',
    right: 0,
    top: 'calc(50% - 52px)',
    backgroundColor: 'hsla(0,0%,100%,.98)',
    boxShadow: '1px 2px 10px -1px rgb(0 0 0 / 30%)',
    height: '104px',
    width: '47px',
    borderBottomRightRadius: '0px',
    borderTopRightRadius: '0px',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    border: '1px solid transparent',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
  },
}));

const CarSection = ({ title, scrollKey, cars }) => {
  const classes = useStyles();

  const handleLeftScroll = () => {
    document.getElementById(`${scrollKey}`).scrollLeft -= 200;
  };

  const handleRightScroll = () => {
    document.getElementById(`${scrollKey}`).scrollLeft += 200;
  };

  return (
    <>
      <Paper elevation={0} className={classes.main}>
        <div className={classes.titleSection}>
          <h2>{title}</h2>
          {/* <Button variant="contained">View All</Button> */}
        </div>
        <Divider variant="fullWidth" />

        <div className={classes.showcase} id={scrollKey}>
          {cars.map((car) => (
            <CarOverview car={car} key={car._id} />
          ))}

          {/* {products &&
            cars.map((product) => <ProductOverview product={product} key={product._id} />)} */}
        </div>
        <button className={classes.backBtn} onClick={handleLeftScroll}>
          <ArrowBackIos />
        </button>
        <button className={classes.nextBtn} onClick={handleRightScroll}>
          <ArrowForwardIos />
        </button>
      </Paper>
    </>
  );
};

export default CarSection;
