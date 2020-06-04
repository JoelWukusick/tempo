import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiTabs: {
      indicator: { width: '6px' }
    },
    MuiTab: {
      textColorInherit: { opacity: .3 }
    }
  },
  palette: {
    type: 'dark',
    primary: { main: '#090D24' },
    secondary: { main: '#F39D83' },
    background: { default: '#384359', paper: '#1E2738' },
    text: {
      primary: '#fff',
      secondary: '#5A6680',
      disabled: '#5A6680',
      hint: '#5A6680'
    }
  },
  typography: {
    fontSize: 12
  }
});

export default responsiveFontSizes(theme);