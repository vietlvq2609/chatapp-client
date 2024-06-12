import { FormEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { TUser } from "../../types/responseTypes";
import AvatarUpload from "../AvatarUpload";
import { makePatchRequestWithAuth } from "../../utils/ApiHandler";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setAppUser } from "../../redux/authSlice";

interface EditProfileProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user?: TUser;
}

function EditProfile({ setOpen, user }: EditProfileProps) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState<dayjs.Dayjs | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);

  const usetId = useAppSelector((state) => state.auth.user?.user_id) ?? "";
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      setDisplayName(user?.username);
      setEmail(user.email);
      setPhone(user.phone_number);
      setBirth(dayjs(user.date_of_birth));
    }
  }, [user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("user_id", usetId);
      formData.append("username", displayName);
      formData.append("email", email);
      formData.append("phone", phone);
      if (birth) {
        formData.append("birth", birth.toISOString());
      }
      if (avatar) {
        formData.append("profile_photo", avatar);
      }
      const res = await makePatchRequestWithAuth(`/users/${usetId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(setAppUser(res.payload));
      alert("Update profile successfully!");
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(event.target.files[0]);
    }
  };
  console.log(user);

  return (
    <Stack sx={{ color: "text.primary" }}>
      <Typography variant="h3">New Profile</Typography>
      <Divider sx={{ bgcolor: "#333" }} />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Stack direction="column" alignItems="center">
          <Typography variant="h6">Upload new avatar</Typography>
          <AvatarUpload
            image={avatar ? URL.createObjectURL(avatar) : null}
            onImageChange={handleImageChange}
            profileUrl={user?.profile_photo_url}
          />
        </Stack>
        <TextField
          sx={{ bgcolor: "divider", borderRadius: 1 }}
          margin="normal"
          required
          fullWidth
          id="displayName"
          label="Display Name"
          name="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <TextField
          sx={{ bgcolor: "divider", borderRadius: 1 }}
          margin="normal"
          required
          fullWidth
          type="email"
          id="email"
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ bgcolor: "divider", borderRadius: 1 }}
          margin="normal"
          required
          fullWidth
          type="number"
          id="phone"
          label="Phone Number"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <DatePicker
          sx={{
            width: "100%",
            bgcolor: "divider",
            mt: 2,
          }}
          label="Date Of Birth"
          name="birth"
          value={birth}
          onChange={(value) => setBirth(value ? dayjs(value) : null)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Confirm
        </Button>
      </Box>
    </Stack>
  );
}

export default EditProfile;
