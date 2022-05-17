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

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('rishabh@gmail.com');
  const [password, setPassword] = useState('abc12345');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useUserContext();

  const sigin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      router.back();
      setError(null);
      setLoading(false);
    } catch (err) {
      console.log(err.response);
      setLoading(false);
      setError(err.response.data.info.message);
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
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{
            width: '100%', // Fix IE11 issue.
            mt: 1,
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            disabled={loading}
            onClick={sigin}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </Button>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <Grid container>
            <Grid item xs>
              <Link href="/forgetPassword" variant="body2">
                <a>Forgot password?</a>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                <a>{"Don't have an account? Sign Up"}</a>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
