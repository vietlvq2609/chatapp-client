import React from 'react';
import { SquareLoader } from 'react-spinners';

import theme from '../theme';
import { Stack } from '@mui/material';

const Spinner = () => {
   return (
      <Stack
         alignItems='center'
         justifyContent='center'
         sx={{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            background: theme.palette.common.white
         }}
      >
         <SquareLoader color={theme.palette.primary.main} size={120} />
      </Stack>
   );
};

export default Spinner;
