import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
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
            value={email}
            onChange={handleEmailChange}
            sx={{ marginBottom: '10px', width: '300px' }}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
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