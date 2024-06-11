import { createTheme } from '@mui/material';

const theme = createTheme({
   typography: {
      fontSize: 15,
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      h1: {
         fontSize: '2rem',
         fontWeight: 700,
         lineHeight: 1.2
      },
      h2: {
         fontSize: '1.75rem',
         fontWeight: 700,
         lineHeight: 1.3
      },
      h3: {
         fontSize: '1.5rem',
         fontWeight: 700,
         lineHeight: 1.4
      },
      h4: {
         fontSize: '1.25rem',
         fontWeight: 700,
         lineHeight: 1.5
      },
      h5: {
         fontSize: '1rem',
         fontWeight: 700,
         lineHeight: 1.6
      },
      h6: {
         fontSize: '0.875rem',
         fontWeight: 700,
         lineHeight: 1.7
      },
      body1: {
         fontSize: '0.9375rem',
         fontWeight: 400,
         lineHeight: 1.6
      },
      body2: {
         fontSize: '0.875rem',
         fontWeight: 400,
         lineHeight: 1.6
      },
      button: {
         fontSize: '0.875rem',
         fontWeight: 700,
         lineHeight: 1.5,
         textTransform: 'none'
      },
      caption: {
         fontSize: '0.75rem',
         fontWeight: 400,
         lineHeight: 1.5
      },
      overline: {
         fontSize: '0.75rem',
         fontWeight: 700,
         lineHeight: 1.5,
         textTransform: 'uppercase'
      }
   },
   palette: {
      primary: {
         main: '#7289DA'
      },
      secondary: {
         main: '#424549'
      },
      background: {
         default: '#36393e',
         paper: '#2f3136'
      },
      text: {
         primary: '#ffffff',
         secondary: '#b9bbbe'
      },
      divider: '#282b30'
   }
});

export default theme;
