import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, TextField, Button } from '@mui/material';

const WordPage = () => {
  const rows = 6;
  const columns = 5;
  const [guess, setGuess] = useState('');
  const [wordOfTheDay, setWordOfTheDay] = useState('');
  const [letterColors, setLetterColors] = useState({});

  useEffect(() => {
    const fetchWordOfTheDay = async () => {
      try {
        console.log('Fetching word of the day...');
        const response = await fetch('http://localhost:3001/api/word-of-the-day', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Fetched word of the day:', data.word);
        setWordOfTheDay(data.word);
      } catch (error) {
        console.error('Error fetching word of the day:', error);
      }
    };

    fetchWordOfTheDay();
  }, []);

  const handleInputChange = (event) => {
    setGuess(event.target.value.toUpperCase());
  };

  const handleSubmit = () => {
    if (guess.length !== 5) {
      alert('Please enter a 5-letter word.');
      return;
    }

    if (!wordOfTheDay) {
      alert('Word of the day is not available.');
      return;
    }

    console.log('Word of the day:', wordOfTheDay);
    console.log('User guess:', guess);

    const newLetterColors = { ...letterColors };

    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      if (wordOfTheDay.includes(letter)) {
        newLetterColors[letter] = wordOfTheDay[i] === letter ? 'green' : 'yellow';
      } else {
        newLetterColors[letter] = 'grey';
      }
    }

    setLetterColors(newLetterColors);
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
                backgroundColor: letterColors[letter] || '#e0e0e0',
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