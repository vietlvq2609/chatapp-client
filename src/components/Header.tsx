import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { FRIENDS } from '../constants/data';
import ModalButton from './ModalButton';
import { Search, StyledBadge } from './index';
import NewChatForm from './forms/NewChatForm';

function Header() {
   const [openModal, setOpenModal] = useState<boolean>(false);

   return (
      <Grid container paddingY={2} paddingX={4} alignItems='center'>
         {/* Online users */}
         <Grid
            lg={4}
            sx={{
               display: 'flex',
               justifyContent: 'left',
               visibility: 'hidden'
            }}
         >
            <AvatarGroup max={6} spacing={0}>
               {FRIENDS.map(item => (
                  <StyledBadge
                     key={item.id}
                     overlap='circular'
                     anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                     }}
                     variant='dot'
                     invisible={!item.isOnline}
                  >
                     <Avatar children={item.name.charAt(0)} />
                  </StyledBadge>
               ))}
            </AvatarGroup>
         </Grid>
         {/* Search bar */}
         <Grid lg={4} sx={{ visibility: 'hidden' }}>
            <Search />
         </Grid>
         {/* Right buttons */}
         <Grid lg={4} sx={{ textAlign: 'right' }}>
            <ModalButton
               title='New Chat'
               buttonProps={{
                  variant: 'contained',
                  size: 'large'
               }}
               open={openModal}
               setOpen={setOpenModal}
               modalEl={<NewChatForm setOpen={setOpenModal} />}
               endIcon={<AddCircleOutlineIcon />}
            />
         </Grid>
      </Grid>
   );
}

export default Header;
