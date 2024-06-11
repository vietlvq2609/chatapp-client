import React from 'react';
import ReactDOM from 'react-dom/client';
import {
   RouterProvider,
   Route,
   createBrowserRouter,
   createRoutesFromElements
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import App from './App';
import theme from './theme';
import store from './redux/store';
import './global.css';
import 'dayjs/locale/en-gb';
import RootRoute from './RootRoute';

const router = createBrowserRouter([{ path: '*', element: <RootRoute /> }]);

const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
);

root.render(
   <React.StrictMode>
      <ThemeProvider theme={theme}>
         <Provider store={store}>
            <LocalizationProvider
               dateAdapter={AdapterDayjs}
               adapterLocale='en-gb'
            >
               <App children={<RouterProvider router={router} />} />
            </LocalizationProvider>
         </Provider>
      </ThemeProvider>
   </React.StrictMode>
);
