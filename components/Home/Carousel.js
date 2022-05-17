import React, { useState } from 'react';
import { Grid, makeStyles, useTheme } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  carouselItem: {
    height: '500px',
    width: '100%',
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  carouselContainer: {
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    top: 'calc(50% - 52px)',
    backgroundColor: 'hsla(0,0%,100%,.98)',
    boxShadow: '0 1px 5px 0 rgb(0 0 0 / 11%)',
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
    boxShadow: '0 1px 5px 0 rgb(0 0 0 / 11%)',
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

const Carousel = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();

  const handleChangeIndex = (index) => {
    setActiveStep(index);
  };

  const handlePrevBtn = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleNextBtn = () => {
    //   ! add activestep = length here
    if (activeStep !== 3) {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <>
      <Grid item lg={10} className={classes.carouselContainer}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleChangeIndex}
          enableMouseEvents
        >
          {new Array(4).fill(1).map((item, index) => (
            <div className={classes.carouselItem} key={index}>
              {index % 2 !== 0 ? (
                <img src="/banner.jpg" alt="product" className={classes.img} />
              ) : (
                <img src="/banner2.jpg" alt="product" className={classes.img} />
              )}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <button
          className={classes.backBtn}
          onClick={handlePrevBtn}
          disabled={activeStep === 0 ? true : false}
        >
          <ArrowBackIos />
        </button>
        <button
          className={classes.nextBtn}
          onClick={handleNextBtn}
          //   ! Add active step === length here
          disabled={activeStep === 3 ? true : false}
        >
          <ArrowForwardIos />
        </button>
      </Grid>
    </>
  );
};

export default Carousel;
