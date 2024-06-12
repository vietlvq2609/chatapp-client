import React, { FormEvent, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

import {
  makeGetRequestWithAuth,
  makePostRequestWithAuth,
} from "../../utils/ApiHandler";
import { hideSpinner, showSpinner } from "../../redux/siteConfigSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { TUser } from "../../types/responseTypes";

interface newChatFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewChatForm = ({ setOpen }: newChatFormProps) => {
  const [autocomplete, setAutocomplete] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState("");
  const [message, setMessage] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    let active = true;
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await makeGetRequestWithAuth("/users");
        if (active) {
          setOptions(
            data.payload
              .map(
                (user: TUser) =>
                  user.email !== currentUser?.email && user.email,
              )
              .filter(Boolean),
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(showSpinner());
      const data = await makePostRequestWithAuth("/conversations", {
        initial_message: message,
        creator_email: currentUser?.email,
        sent_to: [sentTo],
      });
      const { conversation_id } = data.payload;
      navigate(`/chat/${conversation_id}`);
    } catch (e) {
      console.log(e);
    } finally {
      setOpen(false);
      dispatch(hideSpinner());
    }
  };
  console.log(options);

  return (
    <Stack sx={{ color: "text.primary" }}>
      <Typography variant="h3">New Chat</Typography>
      <Divider sx={{ bgcolor: "#333" }} />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Autocomplete
          sx={{ bgcolor: "divider", borderRadius: 1 }}
          fullWidth
          value={autocomplete}
          onChange={(event: any, newValue: string | null) => {
            setAutocomplete(newValue);
          }}
          inputValue={sentTo}
          onInputChange={(event, newInputValue) => {
            setSentTo(newInputValue);
          }}
          id="sentTo"
          options={options}
          renderInput={(params) => (
            <TextField {...params} required label="Recipient Email" />
          )}
        />
        <TextField
          sx={{ bgcolor: "divider", borderRadius: 1 }}
          margin="normal"
          required
          fullWidth
          id="message"
          label="Message"
          name="message"
          multiline={true}
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Chat
        </Button>
      </Box>
    </Stack>
  );
};

export default NewChatForm;
