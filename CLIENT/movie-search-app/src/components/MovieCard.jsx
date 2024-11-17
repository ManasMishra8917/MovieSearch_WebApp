import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const MovieCard = ({ movie, onOpenModal }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    }}
    onClick={() => onOpenModal(movie)}
  >
    <Box
      sx={{
        height: 300, 
        backgroundImage: `url(${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'})`,
        backgroundSize: 'auto',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat', 
      }}
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div" align="center">
        {movie.Title}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {movie.Year}
      </Typography>
    </CardContent>
    <Button
      size="small"
      variant="contained"
      color="primary"
      onClick={() => onOpenModal(movie)}
      sx={{
        alignSelf: 'center',
        marginBottom: 1,
      }}
    >
      View Details
    </Button>
  </Card>
);

export default MovieCard;
