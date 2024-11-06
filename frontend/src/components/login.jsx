import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../../utils/mutations';
// import Auth from '../../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [login] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
      navigate('/');
    } catch (e) {
      console.error(e);
      setErrorMessage('Incorrect username or password!');
    }
    setFormState({
      username: '',
      password: '',
    });
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', paddingTop: '100px'}}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center'}}>
          Login
        </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height= 'auto'
        sx={{ backgroundColor: '#fbf5e8', padding: '6rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '25rem',
        minHeight: '25rem' }}
      >

        <form onSubmit={handleSubmit} style={{ maxHeight: '25rem'}}>
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formState.username}
            onChange={handleChange}
            InputProps={{
              style: {backgroundColor: 'white'}
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formState.password}
            onChange={handleChange}
            InputProps={{
              style: {backgroundColor: 'white'}
            }}
          />
          <Box display="flex" justifyContent="center" width="100%" mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ width: '10%', maxWidth: '120px', backgroundColor: '#00008B',
                '&:hover': {
                  backgroundColor: '#00008B66',
                }, }}
            >
              Login
            </Button>
          </Box>   
        </form>
        <Typography variant="body2" style={{ marginTop: '16px', paddingTop: '1rem' }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography>
        <Box sx={{ height: '2rem', padding: '1rem' }}>
        {errorMessage && (
          <Typography color="error" gutterBottom>
            {errorMessage}
          </Typography>
        )}
      </Box>
      </Box>
    </Container>
  );
};

export default Login;