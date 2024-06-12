import { useEffect } from "react";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import { Card, CardContent, Grid, Typography, Container } from "@mui/material";

import { makeGetRequestWithAuth } from "../utils/ApiHandler";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setRecentConversations } from "../redux/conversationSlice";
import { fadeHoverEffect } from "../constants/animation";
import {
  elipsisString,
  getConversationLatestText,
  getReceiverNameFromConversation,
} from "../utils/StringHandler";

const ChatList = () => {
  const conversations = useAppSelector(
    (state) => state.conversation.recentConversations,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await makeGetRequestWithAuth("/conversations");

      if (res && res.http_status === "OK") {
        dispatch(setRecentConversations(res.payload));
      }
    };

    fetchConversations();
  }, []);
  return (
    <Container sx={{ color: "common.white" }}>
      <Grid container spacing={4} padding={4}>
        <Grid item xs={12}>
          <Typography variant="h2" color="text.primary">
            Recently conversations
          </Typography>
        </Grid>
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <Grid item key={conversation.conversation_id} lg={4} sm={12}>
              <Link to={`/chat/${conversation.conversation_id}`}>
                <Card
                  sx={{
                    bgcolor: "background.paper",
                    pb: 1,
                    ...fadeHoverEffect,
                  }}
                >
                  <CardContent>
                    <Typography variant="h3" color="text.primary">
                      {getReceiverNameFromConversation(conversation)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        bgcolor: "background.default",
                        color: "text.primary",
                        borderRadius: 1,
                        paddingLeft: 2,
                        paddingY: 1,
                        marginTop: 1,
                      }}
                    >
                      {elipsisString(getConversationLatestText(conversation))}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        padding: "4px",
                        borderRadius: 1,
                        float: "right",
                      }}
                    >
                      Sent at{" "}
                      {moment(
                        conversation.messages[conversation.messages.length - 1]
                          .sent_at,
                      ).format("DD MMMM [at] HH:mm")}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <Typography padding={4} variant="h6">
            You have no conversation yet! Create one by click to topbar button!
          </Typography>
        )}

        <Grid item xs={12}>
          <Typography variant="h2" color="text.primary">
            Online contacts
          </Typography>
        </Grid>
        <Grid item xs={12}>
          No online users
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatList;
