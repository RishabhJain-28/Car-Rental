import Head from 'next/head';
import { makeStyles } from '@material-ui/core';

import Appbar from './Appbar';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: 0,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Car Rental</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Appbar />

      <div className={classes.main}>{children}</div>
    </>
  );
};

export default Layout;
