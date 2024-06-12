import { useState, useEffect, useRef, FormEvent } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PhoneIcon from "@mui/icons-material/Phone";
import MicIcon from "@mui/icons-material/Mic";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VideoCamIcon from "@mui/icons-material/Videocam";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link, useParams } from "react-router-dom";

import { Message } from "../components";
import { makeGetRequestWithAuth } from "../utils/ApiHandler";
import { TMessage, TUser } from "../types/responseTypes";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { wsClient } from "../redux/socketSlice";
import {
  elipsisString,
  getConversationLatestText,
  getReceiverFromConversation,
  getReceiverNameFromConversation,
} from "../utils/StringHandler";
import CtAvatar from "../components/CtAvatar";
import { setRecentConversations } from "../redux/conversationSlice";
import { activeBackground, fadeHoverEffect } from "../constants/animation";

function ChatPage() {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [text, setText] = useState<string>("");
  const [receiver, setReceiver] = useState<TUser>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chatId } = useParams();
  const isConnectWss = useAppSelector((state) => state.socket.isConnected);
  const user_id = useAppSelector((state) => state.auth.user?.user_id);
  const user_email = useAppSelector((state) => state.auth.user?.email);
  const recentConversations = useAppSelector(
    (state) => state.conversation.recentConversations,
  );
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchMessageData = async () => {
      try {
        const data = await makeGetRequestWithAuth(`/conversations/${chatId}`);

        setMessages(data?.payload.messages);
        for (let i = 0; i < data?.payload.members.length; i++) {
          const member = data.payload.members[i];
          if (member.email !== user_email) {
            setReceiver(member);
            break;
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchConversations = async () => {
      const res = await makeGetRequestWithAuth("/conversations");

      if (res && res.http_status === "OK") {
        dispatch(setRecentConversations(res.payload));
      }
    };

    fetchConversations();

    if (chatId)
      fetchMessageData().then(() => setTimeout(() => scrollToBottom(), 500));
  }, [chatId, dispatch, user_email]);

  useEffect(() => {
    const handleReceiveMessageEvent = (message: any) => {
      const parsedMessage = JSON.parse(message.body);
      setMessages((prevMessages) => {
        return parsedMessage?.message_id !==
          prevMessages[prevMessages.length - 1].message_id
          ? [...prevMessages, parsedMessage]
          : prevMessages;
      });
      setTimeout(() => scrollToBottom(), 100);
    };

    if (wsClient.connected && chatId) {
      wsClient.subscribe(
        `/topic/conversations/${chatId}`,
        handleReceiveMessageEvent,
      );
    }
  }, [isConnectWss, chatId]);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (wsClient.connected) {
      const messageDto = {
        conversation_id: chatId,
        message_text: text,
        sender_id: user_id,
      };
      wsClient.publish({
        destination: `/app/sendMessage/${chatId}`,
        body: JSON.stringify(messageDto),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setText("");
    } else {
      alert("System Error! Please try sending again :(");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isConnectWss)
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <Typography p={4} color="common.white" variant="h5">
          Connecting to server... Refresh the page if you have waited too long!
        </Typography>
      </Stack>
    );

  if (!chatId)
    return (
      <Typography variant="h5">
        No conversation yet! Please create new chat on topbar!
      </Typography>
    );

  return (
    <Grid
      container
      height="100%"
      color="text.primary"
      bgcolor="background.default"
    >
      {/* Chat  Box */}
      <Grid container lg={9} xs={12} height="100%">
        <Grid
          xs={12}
          p={2}
          height="12%"
          sx={{ borderBottom: "solid 1px #333" }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <CtAvatar user={receiver} />
              <Box>
                <Typography variant="h2">{receiver?.username}</Typography>
                <Typography variant="subtitle1">Online</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={4}>
              <PhoneIcon />
              <VideoCamIcon />
              <MoreVertIcon />
            </Stack>
          </Stack>
        </Grid>
        <Grid
          p={2}
          xs={12}
          height="78%"
          bgcolor="background.default"
          sx={{ overflowY: "auto" }}
        >
          <Stack height="100%">
            {messages?.map((message) => (
              <Message key={message.message_id} message={message} />
            ))}
            <div ref={messagesEndRef} />
            <br />
          </Stack>
        </Grid>
        <Grid container xs={12} p={2} height="10%">
          <Grid xs={11} pr={2}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                bgcolor: "common.white",
              }}
              onSubmit={sendMessage}
            >
              <IconButton sx={{ p: "10px" }} aria-label="attachment">
                <AttachFileIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1, color: "common.black" }}
                placeholder="Type a message"
                value={text}
                onChange={(value) => setText(value.target.value)}
                inputProps={{ "aria-label": "type a message" }}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SendIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid xs={1} sx={{ display: "flex", justifyContent: "end" }}>
            <Button variant="contained" sx={{ bgcolor: "primary.main" }}>
              <MicIcon
                sx={{
                  color: "common.white",
                  fontSize: "40px",
                }}
              />
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Recent Chats */}
      <Grid lg={3} xs={0} height="100%">
        <Typography
          p={2}
          variant="h3"
          height="12%"
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "solid 1px #333",
          }}
        >
          Recently chats
        </Typography>
        <List
          sx={{
            overflow: "auto",
            height: "88%",
            borderLeft: "1px solid #333",
          }}
        >
          {recentConversations.map((conversation) => (
            <ListItem
              key={conversation.conversation_id}
              sx={[
                { ...fadeHoverEffect },
                chatId === conversation.conversation_id.toString() && {
                  ...activeBackground,
                },
              ]}
            >
              <Link to={`/chat/${conversation.conversation_id}`}>
                <Grid container xs={12} sx={{ display: "flex" }}>
                  <CtAvatar
                    sx={{ height: "45px", width: "45px" }}
                    user={getReceiverFromConversation(conversation)}
                  />
                  <Stack>
                    <Typography ml={2} variant="subtitle1" sx={{ flex: 1 }}>
                      {getReceiverNameFromConversation(conversation)}
                    </Typography>
                    <Typography ml={2} variant="caption" sx={{ flex: 1 }}>
                      {elipsisString(
                        getConversationLatestText(conversation),
                        40,
                      )}
                    </Typography>
                  </Stack>
                </Grid>
              </Link>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

export default ChatPage;
