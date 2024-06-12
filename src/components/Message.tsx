import React from "react";
import Paper from "@mui/material/Paper";

import { TMessage } from "../types/responseTypes";
import theme from "../theme";
import { useAppSelector } from "../redux/store";

interface MessageProps {
  message: TMessage;
}

function Message({ message }: MessageProps) {
  const currentUserId = useAppSelector((state) => state.auth.user?.user_id);
  const isSendByCurrentUser = message.sender.user_id === currentUserId;

  return (
    <>
      <Paper
        sx={{
          position: "relative",
          px: 2,
          py: 1,
          fontSize: theme.typography.body1,
          maxWidth: "50%",
          mb: 1,
          bgcolor: isSendByCurrentUser
            ? theme.palette.secondary.dark
            : theme.palette.common.white,
          color: isSendByCurrentUser
            ? theme.palette.common.white
            : theme.palette.common.black,
          alignSelf: isSendByCurrentUser ? "flex-end" : "flex-start",
        }}
        square={false}
      >
        {message.message_text}
        {/* <Typography sx={{position: "absolute", top: "100%"}} variant='caption'>{message.sent_datetime}</Typography> */}
      </Paper>
    </>
  );
}

export default Message;
