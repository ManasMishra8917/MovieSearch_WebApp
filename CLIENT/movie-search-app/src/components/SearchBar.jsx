import { Box, TextField, Button } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    onSearch(query);
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2, p: 2 }}>
      <TextField label="Search Movies" name="query" fullWidth />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
