import React, { useState } from 'react';
import { Container, Box, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Homepage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleStartGame = () => {
    navigate('/gamePage'); // Navigate to the game page
  };

  const handleLoginClick = () => {
    navigate('/login');
  }

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <>
    <ThemeProvider theme={theme}>
    <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
              <IconButton color="inherit" onClick={handleThemeToggle}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
      <Container maxWidth="md" sx={{ marginTop: '20rem', textAlign: 'center' }}>
        <Box sx={{ padding: '20px', backgroundColor: darkMode ? '#424242' : '#f5f5f5', borderRadius: '10px', boxShadow: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Wordle
          </Typography>
          <Typography variant="body1" gutterBottom>
            Guess the hidden word in 6 tries. Each guess must be a valid 5-letter word. Hit the enter button to submit. After each guess, the color of the tiles will change to show how close your guess was to the word.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLoginClick} sx={{ marginTop: '20px', width: '8rem', backgroundColor: darkMode ? '#222222' : '#444444', color: 'white' }}>
            Login
          </Button>
          <Button variant="contained" color="primary" onClick={handleStartGame} sx={{ marginTop: '20px', width: '8rem', marginLeft: '4rem', backgroundColor: darkMode ? '#222222' : '#444444', color: 'white' }}>
            Start Game
          </Button>
        </Box>
      </Container>
      </Box>
      </ThemeProvider>
    </>
  );
};

export default Homepage;