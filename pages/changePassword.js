import { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import axios from '../utils/axios';
import useProtectedPage from '../hooks/useProtectedPage';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  useProtectedPage();

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/user/changePassword/`, {
        oldPassword,
        newPassword,
        confirmNewPassword,
      });
      console.log(data);
      setSuccess(true);
      setError(null);
      setLoading(false);
      console.log('a');
      // router.push('/login');
    } catch (err) {
      console.log(err.response);
      setLoading(false);
      // setError(err.response.data.message);
    }
  };

  return (
    // <ProtectedPage>
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
          Change password
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
            name="oldPassword"
            label="Old Password"
            type="password"
            id="oldPassword"
            autoComplete="current-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <Button
            disabled={loading}
            onClick={changePassword}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? 'Loading...' : 'Change Password'}
          </Button>
          {success && (
            <Typography variant="body2" style={{ color: 'green' }}>
              Password changed successfully
            </Typography>
          )}
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
    // {/* </ProtectedPage> */}
  );
}
export default ChangePassword;

// export const getServerSideProps = async function ({ req, res }) {
//   //! check for req.user

//   return {
//     props: {},
//   };
// };
