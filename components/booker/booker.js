import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useBookingContext } from '../../utils/context/bookingContext';
const theme = createTheme();

function BasicDatePicker({ text, val, setVal }) {
  // const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={text}
        value={val}
        onChange={(val) => {
          setVal(val);
        }}
        renderInput={(params) => <TextField fullWidth {...params} />}
      />
    </LocalizationProvider>
  );
}
export default function Booker() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const {
    showAvailable,
    showCars,
    fetchCars,
    car,
    type,
    setType,
    from,
    setFrom,
    to,
    setTo,
    location,
    setLocation,
  } = useBookingContext();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Search Cars
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  // required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  fullWidth
                  name="Location"
                  label="Location"
                  // type="Location"
                  id="Location"
                  // autoComplete="new-Location"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  fullWidth
                  name="CarType"
                  label="CarType"
                  // type="CarType"
                  id="CarType"
                  // autoComplete="new-CarType"
                />
              </Grid>

              <Grid item xs={12}>
                {/* <p>From:</p> */}
                <BasicDatePicker val={from} setVal={setFrom} text="From" />
              </Grid>
              <Grid item xs={12}>
                {/* <h4>To:</h4> */}
                <BasicDatePicker val={to} setVal={setTo} text="To" />
              </Grid>

              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
              </Grid>
            </Grid>
            {/* <Button onClick={showCars} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> */}
            <Button onClick={fetchCars} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Get Available Cars!
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
