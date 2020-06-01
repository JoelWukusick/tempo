import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2C4F85' },
    secondaray: { main: '#E52909' }
  }
});

export default responsiveFontSizes(theme);