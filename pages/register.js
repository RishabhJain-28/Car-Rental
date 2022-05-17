import { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useUserContext } from '../utils/context/userContext';

const FORM_TEXT_FIELDS = [
  {
    id: 'firstName',
    name: 'firstName',
    label: 'First Name',
    type: 'text',
  },
  {
    id: 'lastName',
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'text',
  },
  {
    id: 'password',
    name: 'password',
    label: 'Password',
    type: 'password',
  },
  {
    id: 'confirmPassword',
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
  },
];

export default function Register() {
  const router = useRouter();
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const { register } = useUserContext();
  const [loading, setLoading] = useState(false);

  const signup = async (e) => {
    e.preventDefault();
    console.log(newUser);
    try {
      setLoading(true);
      await register(newUser);
      router.push('/');
      setLoading(false);
      setError(null);
    } catch (err) {
      setLoading(false);
      console.log(err.response);
      setError(err.response.data.message);
    }
  };

  return (
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{
            width: '100%', // Fix IE11 issue.
            mt: 1,
          }}
        >
          {FORM_TEXT_FIELDS.map((field) => (
            <TextField
              key={field.id}
              margin="normal"
              required
              fullWidth
              id={field.id}
              label={field.label}
              name={field.name}
              // autoComplete="email"
              type={field.type}
              value={newUser[field.id]}
              onChange={(e) => {
                const tempUser = { ...newUser };
                tempUser[field.id] = e.target.value;
                setNewUser(tempUser);
              }}
            />
          ))}

          <Button
            disabled={loading}
            onClick={signup}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </Button>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                <a>{'Already have an account? Sign In'}</a>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
