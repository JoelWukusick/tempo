import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: { textTransform: 'none' }
    },
    MuiTabs: {
      indicator: { width: '8px', height: '8px' }
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        fontSize: '12px',
        '&$selected': { backgroundColor: '#090D24' }
      },
      textColorInherit: { opacity: .3 }
    },
    MuiToggleButtonGroup: {
      root: { padding: '0px' },
      grouped: {
        '&:not(:first-child)': {
          borderTopLeftRadius: '12px',
          borderBottomLeftRadius: '12px'
        },
        '&:not(:last-child)': {
          borderTopRightRadius: '12px',
          borderBottomRightRadius: '12px'
        }
      }
    },
    MuiToggleButton: {
      root: {
        textTransform: 'none',
        padding: '0px',
        fontSize: '10px',
        marginRight: '7px',
        borderRadius: '12px',
        borderWidth: 0,
        height: '24px',
        width: '54px',
        backgroundColor: '#1E2738',
        '&$selected': { backgroundColor: '#3C7F8B' }
      }
    },
    MuiTextField: { root: { backgroundColor: '#fff' } },
    MuiFilledInput: { input: { color: '#000' } },
    MuiSlider: {
      rail: { backgroundColor: '#A3B1B9'},
      track: {backgroundColor: '#3C7F8B'},
      thumb: { backgroundColor: '#3C7F8B'},
    }
  },
  palette: {
    type: 'dark',
    primary: { main: '#090D24' },
    secondary: { main: '#F39D83' },
    background: { default: '#384359', paper: '#1E2738' },
    text: {
      primary: '#fff',
    }
  },
  typography: {
    fontSize: 12
  }
});

export default responsiveFontSizes(theme);