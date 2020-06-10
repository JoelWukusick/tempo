import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Popover, Typography, Button, Container, Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  buttonRight: {
    marginRight: 0,
    // marginRight: 'calc((100vw - 1354px)/2)',
    // [theme.breakpoints.down('md')]: {
    //   marginRight: '0px'
    // }
  },
  close: {
    float: 'right',
    marginTop: theme.spacing(2)
  }
}));

export default function Help() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button className={classes.buttonRight} color="inherit" onClick={handleClick}>
        help
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Container maxWidth='sm'>
          <CloseIcon className={classes.close} onClick={handleClose} fontSize='large'/>
          <Box p={1} pt={6}>
            <Typography variant='h5'>
              Login
            </Typography>
            <Typography variant='body1' gutterBottom>
              The login page gives you the option to login with Spotify, allowing you to save the playlists Tempo creates. If you proceed without logging in, you can create a playlist, but there is no way to save the playlist or play the songs. Logging in gives the Tempo app permission to write public playlists to your spotify account.
            </Typography>
            <Typography variant='h5'>
              Search
            </Typography >
            <Typography variant='body1' gutterBottom>
              The ‘Search’ section allows you to choose what your playlist will be seeded by. Search artists, tracks, or genres that you want to influence your playlist. Select the type with the buttons above the search bar. Click on a search result to add it to your ‘seed.’ The ‘seed’ can contain up to five artists, tracks, and/or genres. Your current ‘seed’ will appear on the bottom navigation bar. Once you have added a seed, you can click next to proceed to ‘Controls.’
            </Typography>
            <Typography variant='h5'>
              Controls
            </Typography>
            <Typography variant='body1' gutterBottom>
              Controls allow you to select the tempo range you want your playlist’s tracks to fall in. It also allows you to select ranges of ‘energy’, ‘danceability’, and ‘Valance.’ Valance’ is musical positivity, happiness, cheerfulness, and euphoria. You can choose a preset setting, or create a custom setting. To create a custom setting, click on the ‘custom’ button on the top of the ‘Controls’ page. Once you have the setting you want, click ‘Create Playlist.'
            </Typography>
            <Typography variant='h5'>
              Playlist
            </Typography>
            <Typography variant='body1' gutterBottom>
              Playlist displays the tracks in the newly created playlist. If you logged in with spotify, you can click ‘Save Playlist’ to save the playlist to your spotify account.
            </Typography>
          </Box>
        </Container>
      </Popover>
    </div>
  );
}