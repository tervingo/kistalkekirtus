import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
          '&.Mui-selected': {
            backgroundColor: '#1976d2',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
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