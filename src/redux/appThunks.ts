import { createAsyncThunk } from "@reduxjs/toolkit";
import { TLogin, TRegister } from "../types/requestTypes";
import { wsClient } from "./socketSlice";
import { isAxiosError, makePostRequest } from "../utils/ApiHandler";

const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ username, password }: TLogin, { rejectWithValue }) => {
    try {
      const data = await makePostRequest("/auth/signin", {
        username,
        password,
      });
      return data.payload;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error);
      }
      throw error;
    }
  },
);

const registerThunk = createAsyncThunk(
  "auth/register",
  async ({
    username,
    password,
    email,
    phone_number,
    date_of_birth,
  }: TRegister) => {
    try {
      const data = await makePostRequest("/auth/signup", {
        username,
        password,
        email,
        phone_number,
        date_of_birth,
      });
      return data.payload;
    } catch (error) {
      console.log(error);
    }
  },
);

const connectToWsThunk = createAsyncThunk("ws/connect", async () => {
  try {
    wsClient.activate();
    const isConnected = await awaitConnect({
      retries: 5,
      curr: 0,
      timeinterval: 100,
    });

    return isConnected;
  } catch (error) {
    console.log(error);
  }
});

const awaitConnect = async (awaitConnectConfig: {
  retries: number;
  curr: number;
  timeinterval: number;
}) => {
  const {
    retries = 3,
    curr = 0,
    timeinterval = 100,
  } = awaitConnectConfig || {};

  return new Promise<boolean>((resolve) => {
    setTimeout(async () => {
      if (wsClient && wsClient.connected) {
        resolve(true);
      } else {
        console.log("Failed to connect! Retrying...");
        if (curr >= retries) {
          console.log(
            "Failed to connect server, please retry by refreshing the current page!",
          );
          resolve(false);
        } else {
          resolve(
            await awaitConnect({ ...awaitConnectConfig, curr: curr + 1 }),
          );
        }
      }
    }, timeinterval);
  });
};

export { loginThunk, registerThunk, connectToWsThunk };
