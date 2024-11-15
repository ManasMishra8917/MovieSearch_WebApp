import { Modal, Box, Typography } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const MovieModal = ({ isOpen, onClose, movie }) => (
  <Modal open={isOpen} onClose={onClose}>
    <Box sx={modalStyle}>
      <Typography variant="h6" component="h2">
        {movie?.Title}
      </Typography>
      <Typography sx={{ mt: 2 }}>
        <strong>Plot:</strong> {movie?.Plot}
      </Typography>
      <Typography sx={{ mt: 1 }}>
        <strong>Genre:</strong> {movie?.Genre}
      </Typography>
      <Typography sx={{ mt: 1 }}>
        <strong>Ratings:</strong> {movie?.imdbRating}
      </Typography>
    </Box>
  </Modal>
);

export default MovieModal;
