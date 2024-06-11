import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '../types/responseTypes';
import { loginThunk, registerThunk } from './appThunks';

interface AuthState {
   isAuthenticated: boolean;
   token: string | null;
   user: TUser | null;
}

const initialState: AuthState = {
   isAuthenticated: false,
   token: null,
   user: null
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: state => {
         state.isAuthenticated = false;
         state.user = null;
         localStorage.removeItem('token');
         localStorage.removeItem('userInfo');
      },
      initiateAuth: state => {
         const token = localStorage.getItem('token');
         if (token && token.length > 0) {
            state.isAuthenticated = true;
            state.token = token;
         }
         const userInfo = localStorage.getItem('userInfo');
         if (userInfo && userInfo.length > 0) {
            state.user = JSON.parse(userInfo);
         }
      },
      refreshToken: state => {
         const token = localStorage.getItem('token');
         if (token && token.length > 0) {
            state.isAuthenticated = true;
            state.token = token;
         }
      },
      setAppUser: (state, action) => {
         localStorage.setItem('userInfo', JSON.stringify(action.payload));
         state.user = action.payload;
      }
   },
   extraReducers: builder => {
      builder
         .addCase(loginThunk.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.userInfo;

            localStorage.setItem('token', action.payload.token);
            localStorage.setItem(
               'userInfo',
               JSON.stringify(action.payload.userInfo)
            );
         })
         .addCase(registerThunk.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.userInfo;

            localStorage.setItem('token', action.payload.token);
            localStorage.setItem(
               'userInfo',
               JSON.stringify(action.payload.userInfo)
            );
         });
   }
});

export const { logout, initiateAuth, refreshToken, setAppUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
