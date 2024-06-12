import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../redux/store";
import { logout, setAppUser } from "../redux/authSlice";
import { StyledBadge } from "../components";
import ModalButton from "../components/ModalButton";
import ChangePasswordForm from "../components/forms/ChangePasswordForm";
import { makeGetRequestWithAuth } from "../utils/ApiHandler";
import CtAvatar from "../components/CtAvatar";
import EditProfile from "../components/forms/EditProfile";

function SettingPage() {
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
  const [openEditProfile, setOpenEditProfile] = useState<boolean>(false);
  const appUser = useAppSelector((state) => state.auth.user) ?? undefined;
  const currentUser = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await makeGetRequestWithAuth(
          `/users/${currentUser?.user_id}`,
        );
        dispatch(setAppUser(res.payload));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [currentUser?.user_id, dispatch]);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Container sx={{ color: "common.white" }}>
      <Typography variant="h2" mb={2}>
        My Account
      </Typography>
      <Box
        sx={{
          position: "relative",
          borderRadius: 2,
          paddingTop: 10,
          bgcolor: "primary.main",
          maxWidth: "60%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 40,
            left: 40,
            bgcolor: "background.paper",
            padding: 1,
            borderRadius: 100,
          }}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent=" "
          >
            <CtAvatar
              user={appUser}
              sx={{
                width: 80,
                height: 80,
              }}
            />
          </StyledBadge>
        </Box>
        <Box
          sx={{
            padding: 3,
            bgcolor: "background.paper",
            borderEndEndRadius: 8,
            borderEndStartRadius: 8,
          }}
        >
          <Stack direction="row" justifyContent="flex-end">
            <ModalButton
              title="Edit profile"
              open={openEditProfile}
              setOpen={setOpenEditProfile}
              modalEl={
                <EditProfile user={appUser} setOpen={setOpenEditProfile} />
              }
            />
          </Stack>
          <Grid
            container
            sx={{
              padding: 3,
              bgcolor: "background.default",
              borderRadius: 2,
              mt: 2,
            }}
          >
            <Grid item xs={6}>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ textTransform: "uppercase" }}
              >
                DISPLAY NAME
              </Typography>
              <Typography variant="body2">{appUser?.username}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ textTransform: "uppercase" }}
              >
                USERNAME
              </Typography>
              <Typography variant="body2">{appUser?.email}</Typography>
            </Grid>
            <Grid item xs={12} height={20}></Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ textTransform: "uppercase" }}
              >
                EMAIL
              </Typography>
              <Typography variant="body2">{appUser?.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ textTransform: "uppercase" }}
              >
                PHONE NUMBER
              </Typography>
              <Typography variant="body2">{appUser?.phone_number}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Typography variant="h3" my={2}>
        Password
      </Typography>
      <ModalButton
        title="Change Password"
        open={openChangePassword}
        setOpen={setOpenChangePassword}
        modalEl={<ChangePasswordForm setOpen={setOpenChangePassword} />}
      />

      <Typography variant="h3" my={2}>
        Logout
      </Typography>
      <Button variant="contained" color="error" onClick={onLogout}>
        Lougout
      </Button>
    </Container>
  );
}

export default SettingPage;
