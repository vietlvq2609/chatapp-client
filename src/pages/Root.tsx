import { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { Outlet, Navigate, useNavigate, Link } from 'react-router-dom';

import { NavigationBar, Header } from '../components';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { isAxiosError, makePostRequest } from '../utils/ApiHandler';
import { logout, refreshToken } from '../redux/authSlice';
import { hideSpinner, showSpinner } from '../redux/siteConfigSlice';
import { disconnectWss } from '../redux/socketSlice';
import { connectToWsThunk } from '../redux/appThunks';

function Root() {
   const [loading, setLoading] = useState(true);
   const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const token = localStorage.getItem('token');
   const requestNewToken = async () => {
      if (token) {
         try {
            const data = await makePostRequest('/auth/refresh-token', token);
            localStorage.setItem('token', data?.payload?.refreshToken);
            dispatch(connectToWsThunk());
         } catch (error) {
            if (isAxiosError(error) && error?.response?.data?.error_type == "JWT_EXPIRED") {
               alert('Session ends! Please login to new session!');
               dispatch(logout());
               navigate('/login');
            } else {
               throw error;
            }
         }

         dispatch(refreshToken());
      } else {
         localStorage.clear();
         navigate('/login');
      }
   };

   const isFirstRender = useRef(true);

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      dispatch(showSpinner());
      requestNewToken()
         .finally(() => {
            dispatch(hideSpinner());
            setLoading(false);
         });

      return () => {
         dispatch(disconnectWss());
      };
   }, [isAuthenticated]);

   if (loading) return <div>Loading</div>;

   if (!isAuthenticated) return <Navigate to='/login' />;

   return (
      <main>
         <Grid container height='100vh'>
            <Grid md={0} lg={2}>
               <NavigationBar />
            </Grid>
            <Grid md={12} lg={10} height='100%' bgcolor='secondary.main'>
               <Box height='8%'>
                  <Header />
               </Box>
               <Box height='92%'>
                  <Outlet />
               </Box>
            </Grid>
         </Grid>
      </main>
   );
}

export default Root;
