import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useBookingContext } from '../../utils/context/bookingContext';
import { useRouter } from 'next/router';
import moment from 'moment';

export default function Review() {
  const router = useRouter();
  const id = router.query.id;
  // console.log(id);
  const { cars, payment, shipping, car, location, from, to } = useBookingContext();
  console.log(car);
  if (!car) return <></>;
  const [choice] = cars.filter((c) => {
    console.log(c._id);
    return c._id == car;
  });
  console.log(choice);

  // return <></>;

  const addresses = [shipping.addressLine1, shipping.city, shipping.state, shipping.zip];
  const details = [
    {
      name: 'Car: ',
      // val: cars[id - 1].name,
      val: choice.name,
      // val: 'choice.name',
    },
    {
      name: 'CarType: ',
      // val: 'choice.type',
      val: choice.type,
    },
    {
      name: 'Location: ',
      val: location,
    },
    {
      name: 'From: ',
      val: from ? from.toString() : '',
    },
    {
      name: 'To: ',
      val: to ? to.toString() : '',
      // val: to.toString(),
    },
    // { name: 'Shipping', desc: '', price: 'Free' },
  ];
  const payments = [
    { name: 'Card type', detail: payment.cardType },
    { name: 'Card holder', detail: payment.cardName },
    { name: 'Card number', detail: payment.cardNum },
    { name: 'Expiry date', detail: payment.expDate },
  ];
  console.log();
  let duration = Math.round(moment(to).diff(moment(from)) / (60 * 60 * 24 * 1000));
  duration = duration == 0 ? 1 : duration;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {details.map((d) => (
          <React.Fragment key={d.name}>
            <h2>{d.name}</h2>
            <p>{d.val}</p>
          </React.Fragment>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={`Total: ${duration} days * ₹${choice.price}`} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ₹{duration * choice.price}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{shipping.firstName + ' ' + shipping.lastName}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
