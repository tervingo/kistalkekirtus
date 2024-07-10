import { createTheme } from '@mui/material/styles';
import { blue, orange, indigo, lightGreen, green, red, grey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
          main: grey[400], // This is the default MUI blue
          dark: grey[700], // You can change this to any color you want
        },
        toggle: {
          on: blue[700],
          off: grey[200],
          over: grey[100],
        },
        labels: {
          bgblue: blue[900],
          bggreen: green[900],
          bgorange: orange[900],
          tx: grey[100]
        }
      },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          padding: '10px 20px',
        },
        containedPrimary: {
          backgroundColor: '#1976d2',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: '1px solid #1976d2',
          backgroundColor: grey[200],
          '&.Mui-selected': {
            backgroundColor: blue[700],
            color: '#ffffff',
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          '& .MuiToggleButton-root': {
            '&:first-of-type': {
              borderRadius: '4px 0 0 4px',
            },
            '&:last-of-type': {
              borderRadius: '0 4px 4px 0',
            },
          },
        },
      },
    },
  },
});

export default theme;