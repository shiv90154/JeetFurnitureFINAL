import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#003B78',        // Primary blue
      light: '#336C93',       // Lighter shade of primary
      dark: '#002A5A',        // Darker shade of primary
      contrastText: '#F5F5F5', // Light text on primary
    },
    secondary: {
      main: '#FF6A00',        // Secondary orange
      light: '#FF8F33',       // Lighter shade of secondary
      dark: '#CC5500',        // Darker shade of secondary
      contrastText: '#FFFFFF', // White text on secondary
    },
    accent: {
      main: '#C18A46',        // Accent gold/brown
      light: '#D4A96A',       // Lighter shade of accent
      dark: '#A57338',        // Darker shade of accent
    },
    background: {
      default: '#FFFFFF',     // Background Light
      paper: '#FFFFFF',       // Paper background
    },
    text: {
      primary: '#222222',     // Text Dark
      secondary: '#666666',   // Medium gray for secondary text
      disabled: '#999999',    // Disabled text
      light: '#F5F5F5',       // Text Light (for dark backgrounds)
    },
    action: {
      hover: 'rgba(0, 59, 120, 0.04)',  // Light blue hover
      hoverOpacity: 0.04,
      selected: 'rgba(0, 59, 120, 0.08)', // Selected state
      selectedOpacity: 0.08,
      disabled: 'rgba(0, 0, 0, 0.26)',   // Disabled state
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      color: '#222222',
    },
    h2: {
      fontWeight: 600,
      color: '#222222',
    },
    h3: {
      fontWeight: 600,
      color: '#222222',
    },
    h4: {
      fontWeight: 600,
      color: '#222222',
    },
    h5: {
      fontWeight: 600,
      color: '#222222',
    },
    h6: {
      fontWeight: 600,
      color: '#222222',
    },
    body1: {
      color: '#222222',
    },
    body2: {
      color: '#666666',
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#003B78',
          color: '#F5F5F5',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        containedPrimary: {
          backgroundColor: '#003B78',
          '&:hover': {
            backgroundColor: '#002A5A',
          },
        },
        containedSecondary: {
          backgroundColor: '#FF6A00',
          '&:hover': {
            backgroundColor: '#CC5500',
          },
        },
        outlinedPrimary: {
          borderColor: '#003B78',
          color: '#003B78',
          '&:hover': {
            backgroundColor: 'rgba(0, 59, 120, 0.04)',
            borderColor: '#002A5A',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover fieldset': {
              borderColor: '#003B78',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#003B78',
            },
          },
        },
      },
    },
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 59, 120, 0.1)',
    '0px 4px 8px rgba(0, 59, 120, 0.1)',
    '0px 8px 16px rgba(0, 59, 120, 0.1)',
    '0px 16px 24px rgba(0, 59, 120, 0.1)',
    ...Array(20).fill('none'),
  ],
});


export default Theme;