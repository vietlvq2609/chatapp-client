import { createSlice } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { connectToWsThunk } from "./appThunks";

interface SocketState {
  isConnected: boolean;
}

const HOST_SERVER = process.env.REACT_APP_HOST_SERVER || "localhost";
const SOCKET_URL = `http${HOST_SERVER === "localhost"? "":'s'}://${HOST_SERVER}:8080/ws`;

const initialState: SocketState = {
  isConnected: false,
};

const token = localStorage.getItem("token");

const socket = new SockJS(SOCKET_URL);
export const wsClient = new Client({
  connectHeaders: {
    Authorization: `Bearer ${token}`,
  },
  webSocketFactory: () => socket,
  debug: (str) => {
    // console.log(str);
  },
  onConnect: () => {
    wsClient.subscribe(
      "/topic/public",
      (message) => console.log(`Received: ${message.body}`),
      { username: "Anonymous User" },
    );
  },
  onStompError: (frame) => {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  },
});

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    disconnectWss: (state) => {
      state.isConnected = false;
      return state;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(connectToWsThunk.fulfilled, (state, action) => {
      state.isConnected = action.payload ?? false;
    }),
});

export const { disconnectWss } = socketSlice.actions;
export const socketReducer = socketSlice.reducer;
