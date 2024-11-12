import React, { useState } from 'react';
import { Container, Grid, Box, Typography, TextField, Button } from '@mui/material';

const WordPage = () => {
  const rows = 6;
  const columns = 5;
  const [guess, setGuess] = useState('');

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Guess submitted:', guess);
    setGuess('');
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <>
      <Container maxWidth="md" sx={{
          marginTop: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh', 
          }}>
        <Grid container spacing={1} justifyContent="center">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <Grid container item spacing={1} key={rowIndex} justifyContent="center">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Grid item key={colIndex}>
                  <Box
                    sx={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#f5f5f5',
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      fontWeight: 'bold',
                    }}
                  >
                  </Box>
                </Grid>
              ))}
            </Grid>
          ))}
                  <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextField
            label="Enter your guess"
            variant="outlined"
            value={guess}
            onChange={handleInputChange}
            sx={{ marginBottom: '10px', width: '300px' }}
            
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Guess
          </Button>
        </Box>

        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {alphabet.map((letter) => (
            <Box
              key={letter}
              sx={{
                width: '40px',
                height: '40px',
                backgroundColor: '#e0e0e0',
                border: '1px solid #ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '5px',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              {letter}
            </Box>
          ))}
        </Box>
        </Grid>

      </Container>
    </>
  );
};

export default WordPage;