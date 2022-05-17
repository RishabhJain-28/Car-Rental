import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import { Search, ExpandMore, ShoppingCart } from '@material-ui/icons';
import DropDownMenu from './DropdownMenu';
import { profileOptions } from '../utils/DropdownOptions';
import { Button } from '@material-ui/core';

import { useUserContext } from '../utils/context/userContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  nav: {
    position: 'sticky',
    top: 0,
    width: '100%',
    zIndex: '100',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    padding: '1rem',
    height: '70px',
    color: '#fff',
    alignItems: 'center',
    transition: 'all 0.2s ease-in-out',
    padding: '0 6rem 0 6rem',
    boxShadow: '0 4px 12px 0 rgb(0 0 0 / 8%)',
  },
  img: {
    width: 'fit-content',
    alignSelf: 'center',
    '& img': {
      borderRadius: '6px',
      border: '1px solid transparent',
    },
  },
  searchbox: {
    height: '45px',
    alignSelf: 'center',
    display: 'flex',
    padding: '0 2rem 0 1rem',
    flexDirection: 'row',
    // flexGrow: 2,
    '& input': {
      height: '100%',
      width: '700px',
      borderRadius: '5px 0 0 5px',
      border: '1px solid transparent',
      background: '#f5f5f6',
      paddingLeft: '1rem',
      '&:focus': {
        outline: 'none',
        border: '2px solid #eaeaec',
        background: '#fff',
      },
    },
    '& button': {
      backgroundColor: '#f5f5f6',
      border: '1px solid transparent',
      borderRadius: '0 5px 5px 0',

      '&:focus': {
        outline: 'none',
      },
    },
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 1rem 0 1rem',
    cursor: 'pointer',
  },
  icon: {
    margin: 'auto 0 auto 0',
    color: '#282c3f',
  },
  btn: {
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '5px',
    margin: '0 1rem 0 1rem',
    '&:hover': {
      backgroundColor: '#000',
      boxShadow: '0 4px 12px 0 rgb(0 0 0 / 30%)',
    },
  },
  btnOutlined: {
    border: '1px solid #000',
    color: '#000',
    borderRadius: '5px',
    margin: '0 1rem 0 1rem',
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
  cartText: {
    marginTop: '4px',
    marginBottom: '0px',
    color: '#282c3f',
  },
  searchBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexGrow: '2',
  },
}));

export default function Appbar() {
  const classes = useStyles();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const { user } = useUserContext();

  return (
    <>
      <div className={classes.nav}>
        <div className={classes.img}>
          <Link href="/">
            <a>
              <h3 style={{ color: 'black' }}>Car Rentals</h3>
              {/* <Image src="/logo.png" alt="decorma" height={50} width={100} /> */}
            </a>
          </Link>
        </div>
        <div className={classes.searchBoxContainer}>
          <div className={classes.searchbox}></div>
        </div>
        {user.isAuth ? (
          <>
            <div
              className={classes.flexRow}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <h4 style={{ color: '#282c3f' }}>{user.profile.firstName}</h4>
              <ExpandMore className={classes.icon} />
              <DropDownMenu open={open} setOpen={setOpen} options={profileOptions} />
            </div>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              className={classes.btnOutlined}
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
            <Button
              onClick={() => router.push('/register')}
              variant="contained"
              className={classes.btn}
            >
              Register
            </Button>
          </>
        )}
      </div>
    </>
  );
}
