import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import { MAIN_MENU } from '../constants/menu';
import { useAppSelector } from '../redux/store';
import CtAvatar from './CtAvatar';

function NavigationBar() {
   const appUser = useAppSelector(state => state.auth.user);

   return (
      <Box
         component='section'
         height='100%'
         bgcolor='background.paper'
         color='text.primary'
         sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
         <List>
            <Link to={'/'}>
               <ListItem sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <img
                     src='/logo.png'
                     alt='Logo'
                     style={{
                        maxWidth: '100%',
                        maxHeight: '60px',
                        alignSelf: 'center'
                     }}
                  />
                  <Typography variant='h1' sx={{ ml: 1 }}>
                     Bell Chat
                  </Typography>
               </ListItem>
            </Link>
         </List>
         <List sx={{ flex: 1 }}>
            {MAIN_MENU.map((item, index) => (
               <Link key={index} to={item.href}>
                  <ListItem disablePadding>
                     <ListItemButton>
                        <ListItemIcon sx={{ color: 'text.primary' }}>
                           <item.icon />
                        </ListItemIcon>
                        <ListItemText primary={item.message} />
                     </ListItemButton>
                  </ListItem>
               </Link>
            ))}
            <ListItem sx={{ mt: 5 }}>
               <CtAvatar user={appUser}/>
               <Typography component='h5' variant='h6' sx={{ ml: '10px' }}>
                  {appUser?.username}
               </Typography>
            </ListItem>
         </List>
         <List>
            <ListItem>
               <Typography component='span' variant='body2' sx={{ ml: '10px' }}>
                  This app is developed by Viet Le.
               </Typography>
            </ListItem>
         </List>
      </Box>
   );
}

export default NavigationBar;
