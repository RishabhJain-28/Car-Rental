import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'transparent',
    padding: '1rem',
    display: 'flex',
    '& img': {
      height: '300px',
      objectFit: 'contain',
      maxWidth: '100%',
    },
  },
}));

const OfferImage = () => {
  const classes = useStyles();
  return (
    <>
      <Paper elevation={1} className={classes.container}>
        <img src="/car.jpg" alt="offer" />
      </Paper>
    </>
  );
};

export default OfferImage;
