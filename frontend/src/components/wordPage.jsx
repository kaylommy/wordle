import React from 'react';
import { Container, Grid, Box, Typography, AppBar, Toolbar } from '@mui/material';

const WordPage = () => {
  const rows = 6;
  const columns = 5;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Wordle Game
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ marginTop: '50px', textAlign: 'center' }}>
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
                    {/* Add content here if needed */}
                  </Box>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default WordPage;