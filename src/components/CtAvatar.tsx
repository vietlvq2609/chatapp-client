import React from 'react';
import Avatar from '@mui/material/Avatar';
import { TUser } from '../types/responseTypes';
import { SxProps } from '@mui/material';

interface CtAvataProps {
   user: TUser | any;
   customStyles?: {
      width?: string | number;
      height?: string | number;
   };
   sx?: SxProps;
}

const CtAvatar: React.FC<CtAvataProps> = ({ user, sx }) => {

   if (!user) {
      return (
         <Avatar
            sx={{
               bgcolor: 'primary.main',
               ...sx
            }}
         >
            A
         </Avatar>
      );
   }

   return user.profile_photo_url ? (
      <Avatar sx={{ ...sx }} src={user.profile_photo_url} alt={user.username} />
   ) : (
      <Avatar
         sx={{
            bgcolor: 'primary.main',
            ...sx
         }}
      >
         {user.username.charAt(0).toUpperCase()}
      </Avatar>
   );
};

export default CtAvatar;
