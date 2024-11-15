import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const MovieCard = ({ movie, onOpenModal }) => (
  <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
    <CardMedia
      component="img"
      alt={movie.Title}
      height="140"
      image={movie.Poster}
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {movie.Title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {movie.Year}
      </Typography>
    </CardContent>
    <Button
      size="small"
      variant="contained"
      color="primary"
      onClick={() => onOpenModal(movie)}
    >
      View Details
    </Button>
  </Card>
);

export default MovieCard;
