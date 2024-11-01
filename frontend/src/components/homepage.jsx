import React from 'react';
import { Container, Box, Typography, Button, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    // navigate('/game'); // Navigate to the game page
  };

  const handleLoginClick = () => {
    navigate('/login');
  }

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: '20rem', textAlign: 'center' }}>
        <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Wordle
          </Typography>
          <Typography variant="body1" gutterBottom>
            Guess the hidden word in 6 tries. Each guess must be a valid 5-letter word. Hit the enter button to submit. After each guess, the color of the tiles will change to show how close your guess was to the word.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleStartGame} sx={{ marginTop: '20px', width: '8rem' }}>
            Login
          </Button>
          <Button variant="contained" color="primary" onClick={handleLoginClick} sx={{ marginTop: '20px', width: '8rem', marginLeft: '4rem' }}>
            Start Game
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Homepage;