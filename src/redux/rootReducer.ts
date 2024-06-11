import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { siteConfigReducer } from './siteConfigSlice';
import { socketReducer } from './socketSlice';
import { conversationReducer } from './conversationSlice';

export default combineReducers({
   auth: authReducer,
   siteConfig: siteConfigReducer,
   socket: socketReducer,
   conversation: conversationReducer
});
