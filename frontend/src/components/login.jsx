import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN_USER);

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
  } catch (e) {
    console.error(e);
    setErrorMessage('Incorrect username or password!');
  }

  // clear form values
  setFormState({
    username: '',
    password: '',
  });
};

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          marginTop: '50px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh', 
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            sx={{ marginBottom: '10px', width: '300px' }}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={formState.password}
            onChange={handleChange}
            sx={{ marginBottom: '20px', width: '300px' }}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          <Typography sx={{ padding: '1rem' }}> Not a User? <Link to="/signup">Sign up</Link></Typography>
        </Box>
      </Container>
    </>
  );
};

export default Login;