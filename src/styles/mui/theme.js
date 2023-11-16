const { createTheme } = require('@mui/material');

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Poppins, sans-serif',
    },

    pageTitle: {
      fontSize: '34px',
      fontWeight: 600,

      '@media (max-width: 991px)': {
        fontSize: '30px',
      },

      '@media (max-width: 768px)': {
        fontSize: '28px',
      },

      '@media (max-width: 576px)': {
        fontSize: '26px',
      },
    },
  },

  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          pageTitle: 'h1',
        },
      },
    },
    MuiDivider: {
      defaultProps: {
        color: 'grey',
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },

  palette: {
    primary: {
      main: '#005f9e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6b6b6b',
      contrastText: '#ffffff',
    },
    whiteColor: {
      main: '#FFFFFF',
    },
  },
});

export default theme;
