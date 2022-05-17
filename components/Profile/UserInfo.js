import React, { useState } from 'react';
import { Box, Button, makeStyles, useTheme } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { Favorite } from '@material-ui/icons';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { Typography, Grid } from '@material-ui/core';

import { useUserContext } from '../../utils/context/userContext';
import axios from '../../utils/axios';
// import { TextField } from '@mui/material';
import TextField from '@mui/material/TextField';

// const useStyles = makeStyles((theme) => ({
//   carouselContainer: {
//     border: '1px solid #f0f0f0',
//     position: 'relative',
//   },
//   carouselItem: {
//     height: '400px',
//     width: '100%',
//   },
//   img: {
//     height: '100%',
//     width: '100%',
//     objectFit: 'contain',
//   },
//   wishlistBtn: {
//     borderRadius: '50%',
//     border: '1px solid #f0f0f0',
//     backgroundColor: '#fff',
//     boxShadow: '0 1px 4px 0 rgb(0 0 0 / 10%)',
//     width: '36px',
//     maxWidth: '36px',
//     height: '36px',
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     display: 'grid',
//     placeItems: 'center',
//     cursor: 'pointer',
//     '& svg': {
//       fontSize: '16px',
//       color: '#c8c8c8',
//     },
//     '&:focus': {
//       outline: 'none',
//     },
//   },
//   backBtn: {
//     position: 'absolute',
//     left: 0,
//     top: 'calc(50% - 52px)',
//     backgroundColor: 'hsla(0,0%,100%,.98)',
//     boxShadow: '0 1px 5px 0 rgb(0 0 0 / 11%)',
//     height: '104px',
//     width: '47px',
//     borderBottomRightRadius: '4px',
//     borderTopRightRadius: '4px',
//     borderTopLeftRadius: '0px',
//     borderBottomLeftRadius: '0px',
//     border: '1px solid transparent',
//     cursor: 'pointer',
//     '&:focus': {
//       outline: 'none',
//     },
//   },
//   nextBtn: {
//     position: 'absolute',
//     right: 0,
//     top: 'calc(50% - 52px)',
//     backgroundColor: 'hsla(0,0%,100%,.98)',
//     boxShadow: '0 1px 5px 0 rgb(0 0 0 / 11%)',
//     height: '104px',
//     width: '47px',
//     borderBottomRightRadius: '0px',
//     borderTopRightRadius: '0px',
//     borderTopLeftRadius: '4px',
//     borderBottomLeftRadius: '4px',
//     border: '1px solid transparent',
//     cursor: 'pointer',
//     '&:focus': {
//       outline: 'none',
//     },
//   },
// }));

const UserInfo = () => {
  const {
    user: { profile },
    setUser,
  } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [u, setU] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const onChange = (e) => {
    const newUser = {
      ...u,
    };

    newUser[e.target.name] = e.target.value;

    setU(newUser);
  };

  async function updateProfile() {
    try {
      setLoading(true);

      const { data } = await axios.put('/user/update', { ...u });
      console.log(u);
      setLoading(false);
      setUser({ profile: data, isAuth: true });
      // setU(u);
      console.log(data);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  // const User={
  //   first
  // }
  console.log(profile);
  return (
    <>
      <Box component="form" noValidate sx={{ mt: 100 }}>
        <Grid container spacing={1}>
          <Grid item lg={12}>
            <TextField
              // required
              value={u.name}
              onChange={onChange}
              fullWidth
              name="firstName"
              label="First Name"
              // type="Location"
              id="firstName"
              // autoComplete="new-Location"
            />
          </Grid>
          <Grid item lg={12}>
            <TextField
              // required
              value={u.name}
              onChange={onChange}
              fullWidth
              name="lastName"
              label="Last Name"
              // type="Location"
              id="lastName"
              // autoComplete="new-Location"
            />
          </Grid>
          <Grid item lg={12}>
            <TextField
              // required
              value={u.phone}
              onChange={onChange}
              fullWidth
              type="Number"
              name="phone"
              label="phone number"
              // type="CarType"
              id="phone"
              // autoComplete="new-CarType"
            />
          </Grid>
        </Grid>
        {/* <Button onClick={showCars} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> */}
        <Button
          disabled={loading}
          onClick={updateProfile}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? 'loading...' : 'Update info'}
        </Button>
      </Box>
    </>
  );
};

export default UserInfo;
