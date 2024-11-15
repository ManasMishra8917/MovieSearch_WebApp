import React, { useState, useEffect } from 'react';
import { Container, TextField, Grid, CircularProgress } from '@mui/material';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query = '') => {
    setLoading(true);
    const API_KEY = '8b2c07b9'; 
    const url = query
      ? `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      : `https://www.omdbapi.com/?s=popular&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === 'True') {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
    setLoading(false);
  };

  const fetchMovieDetails = async (id) => {
    const API_KEY = '8b2c07b9'; 
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setSelectedMovie(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== '') {
      fetchMovies(e.target.value);
    }
  };

  const openModal = async (movie) => {
    await fetchMovieDetails(movie.imdbID);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <Container sx={{ mt: 4 }}>
      <TextField
        fullWidth
        label="Search for a movie..."
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        sx={{ mb: 4 }}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
              <MovieCard movie={movie} onOpenModal={openModal} />
            </Grid>
          ))}
        </Grid>
      )}
      {selectedMovie && (
        <MovieModal
          isOpen={isModalOpen}
          onClose={closeModal}
          movie={selectedMovie}
        />
      )}
    </Container>
  );
};

export default HomePage;
