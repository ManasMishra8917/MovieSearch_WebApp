import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Movie Search App
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;
