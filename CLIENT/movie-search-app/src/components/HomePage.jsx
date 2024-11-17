import React, { useState, useEffect } from 'react';
import { Container, TextField, Grid, CircularProgress } from '@mui/material';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query = '') => {
    setLoading(true);
    const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

    const url = query
      ? `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      : `https://www.omdbapi.com/?s=popular&apikey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === 'True') {
      setMovies(data.Search);
    } else {
      const fallbackResponse = await fetch(
        `https://www.omdbapi.com/?s=popular&apikey=${API_KEY}`
      );
      const fallbackData = await fallbackResponse.json();
      if (fallbackData.Response === 'True') {
        setMovies(fallbackData.Search);
      }
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

  // Use effect for debouncing search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1000); // 1000ms debounce time

    return () => {
      clearTimeout(handler); // Cleanup the timeout on value change
    };
  }, [searchQuery]);

  // Fetch movies whenever debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery.trim() !== '') {
      fetchMovies(debouncedQuery);
    } else {
      fetchMovies();
    }
  }, [debouncedQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const openModal = async (movie) => {
    await fetchMovieDetails(movie.imdbID);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <Container sx={{ mt: 4, marginTop: '94px' }}>
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
