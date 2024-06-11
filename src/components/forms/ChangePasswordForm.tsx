import React, { FormEvent, useState } from 'react';
import {
   Box,
   Button,
   Divider,
   Stack,
   TextField,
   Typography
} from '@mui/material';
import { isAxiosError, makePatchRequestWithAuth } from '../../utils/ApiHandler';
import { error } from 'console';
import { AxiosError } from 'axios';

interface ChangePasswordFormProps {
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChangePasswordForm({ setOpen }: ChangePasswordFormProps) {
   const [currentPassword, setCurrentPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      try {
         event.preventDefault();

         if (newPassword !== newPasswordConfirmation) {
            alert('Password & Password confirmation is not correct!');
            return;
         }

         const res = await makePatchRequestWithAuth('/auth/change-password', {
            current_password: currentPassword,
            new_password: newPassword
         });

         if (res.success) {
            setOpen(false);
            alert("Change password successfully!");
         }
      } catch (error) {
         if (isAxiosError(error)) {
            alert(error.response.data.message);
         }
      } finally {
         // Set loading false
      }
   };

   return (
      <Stack sx={{ color: 'text.primary' }}>
         <Typography variant='h3'>Change Password</Typography>
         <Divider sx={{ bgcolor: '#333' }} />
         <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
         >
            <TextField
               sx={{ bgcolor: 'divider', borderRadius: 1 }}
               margin='normal'
               required
               fullWidth
               id='currentPassword'
               label='Current password'
               type='password'
               name='currentPassword'
               value={currentPassword}
               onChange={e => setCurrentPassword(e.target.value)}
            />
            <TextField
               sx={{ bgcolor: 'divider', borderRadius: 1 }}
               margin='normal'
               required
               fullWidth
               id='newPassword'
               label='New password'
               type='password'
               name='newPassword'
               value={newPassword}
               onChange={e => setNewPassword(e.target.value)}
            />
            <TextField
               sx={{ bgcolor: 'divider', borderRadius: 1 }}
               margin='normal'
               required
               fullWidth
               id='newPasswordConfirmation'
               label='New password confirmation'
               type='password'
               name='newPasswordConfirmation'
               value={newPasswordConfirmation}
               onChange={e => setNewPasswordConfirmation(e.target.value)}
            />
            <Button
               type='submit'
               fullWidth
               variant='contained'
               sx={{ mt: 3, mb: 2 }}
            >
               Confirm
            </Button>
         </Box>
      </Stack>
   );
}

export default ChangePasswordForm;
