import { createSlice } from "@reduxjs/toolkit";
import { TConversation } from "../types/responseTypes";

interface Conversation {
  recentConversations: TConversation[];
}

const initialState: Conversation = {
  recentConversations: [],
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setRecentConversations: (state, action) => {
      state.recentConversations = action.payload;
    },
  },
});

export const { setRecentConversations } = conversationSlice.actions;

export const conversationReducer = conversationSlice.reducer;
