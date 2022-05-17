import React, { useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import useOutsideAlerter from '../hooks/useOutsideAlerter';
import { makeStyles } from '@material-ui/core';

import { UserContext } from '../utils/context/userContext';
const useStyles = makeStyles((theme) => ({
  container: {
    display: (props) => (props.open === true ? 'block' : 'none'),
    opacity: (props) => (props.open === true ? 1 : 0),
    visibility: (props) => (props.open === true ? 'visible' : 'hidden'),
    position: 'fixed',
    top: '5em',
    right: '5em',
    borderRadius: '5px',
    padding: '1rem',
    minWidth: '300px',
    background: `#fff`,
    color: `#000`,
    boxShadow: '-6px -6px 16px #fff, 6px 6px 16px #d1cdc7',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
  },
  animate: {
    animation: `$slideUp 0.2s ${theme.transitions.easing.easeInOut}`,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '1rem',
    wordBreak: 'break-word',
    '&:hover': {
      backgroundColor: 'rgb(211,211,211, 0.4)',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    '& i': {
      paddingRight: '1rem',
      margin: 'auto 0 auto 0',
    },
    '& span': {
      flexGrow: 2,
      margin: 'auto 0 auto 0',
    },
    '& div': {
      lineHeight: '1rem',
      paddingRight: '1rem',
      '& svg': {
        fontSize: '1.8rem',
      },
    },
  },
  '@keyframes slideUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(100%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const DropDownMenu = (props) => {
  const { options, setOpen } = props;
  const classes = useStyles(props);
  const router = useRouter();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);
  const { logout } = useContext(UserContext);

  const actionHandler = async (item) => {
    if (item.text === 'My Profile') {
      router.push('/profile');
    } else if (item.text === 'Logout') {
      try {
        await logout();
        router.push('/');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div
      className={
        props.open === true ? `${classes.container} ${classes.animate}` : classes.container
      }
      ref={wrapperRef}
    >
      {options.map((item, index) => (
        <div
          className={classes.item}
          key={index}
          onClick={() => {
            actionHandler(item);
          }}
        >
          {item.icon && <div>{item.icon}</div>}
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default DropDownMenu;
