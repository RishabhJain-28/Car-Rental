import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}
// import * as React from 'react';
// import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

const rows = [
  createData(0, '16 Mar, 2019', 'Rishabh', 'Jain', 'VISA ⠀•••• 3719', 312.44),
  createData(0, '16 Mar, 2019', 'Abc', '123', 'VISA ⠀•••• 3123', 123.44),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function OrdersTable({ orders, loading }) {
  if (loading) {
    return (
      <>
        <h3>Loading</h3>
      </>
    );
  }

  if (orders.length == 0) {
    return (
      <>
        <h3>No orders to show</h3>
      </>
    );
  }

  return (
    <React.Fragment>
      {/* <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Orders
      </Typography> */}
      {/* <Title></Title> */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((o) => (
            <TableRow key={o.id}>
              <TableCell>{o.createdAt}</TableCell>
              <TableCell>{o.carId.name}</TableCell>
              <TableCell>{o.carId.type}</TableCell>
              <TableCell>{o.from}</TableCell>
              <TableCell>{o.to}</TableCell>
              <TableCell>{o.payment.cardType}</TableCell>
              <TableCell align="right">{`₹${o.total}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}
