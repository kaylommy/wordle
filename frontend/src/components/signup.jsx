import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
// import { useMutation } from '@apollo/client';
// import { CREATE_USER } from '../../utils/mutations';
// import Auth from '../../utils/auth';
// import { Link } from 'react-router-dom';

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [showPassword, setShowPassword] = useState(false);
  const [dobError, setDobError] = useState('');
  const [formError, setFormError] = useState('');

  const calculateAge = (dob) => {
    const diff = Date.now() - dob.getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    return age;
  };

  const handleDateOfBirthChange = (event) => {
    const dateOfBirth = event.target.value;
    const age = calculateAge(new Date(dateOfBirth));

    if (age < 13 || age > 150) {
      setDobError('You must be at least 13 years old and less than 150 years old to sign up.');
    } else {
      setDobError('');
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const dateOfBirth = event.target.dateOfBirth.value;

    const userData = {
      username: event.target.username.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value,
      birthDate: dateOfBirth,
    };

    try {
      const { data } = await createUser({
        variables: { userData },
      });
      Auth.login(data.createUser.token);
      window.location.assign('/');
    } catch (e) {
      console.error(e);
      setFormError('Signup failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', paddingTop: '100px'}}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center'}}>
          Sign Up
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
          minHeight: '25rem',
          maxHeight: '30rem'
        }}
      >


        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            InputProps={{
              style: {backgroundColor: 'white'}
            }}
          />
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            InputProps={{
              style: {backgroundColor: 'white'}
            }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            InputProps={{
              style: {backgroundColor: 'white'}
            }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            InputProps={{
              style: {backgroundColor: 'white'}
            }}
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            InputProps={{
              style: {backgroundColor: 'white'}
            }}
          />
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              style: {backgroundColor: 'white'}
            }}
            onChange={handleDateOfBirthChange}
          />
          {dobError && (
            <Typography color="error" gutterBottom>
              {dobError}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '16px', backgroundColor: '#00008B',
              '&:hover': {
                backgroundColor: '#00008B66',
              }, }}
          >
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" style={{ marginTop: '16px', paddingTop: '1rem' }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
        <Box sx={{ height: '2rem', padding: '1rem' }}>
        {formError && (
          <Typography color="error" gutterBottom>
            {formError}
          </Typography>
        )}
              </Box>
      </Box>
    </Container>
  );
};

export default SignUp;