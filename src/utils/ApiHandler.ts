import axios, {
  AxiosHeaders,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";
import { formatUrlPath } from "./StringHandler";
import { throws } from "assert";
import { TAxiosError } from "../types/responseTypes";

const HOST_SERVER = process.env.REACT_APP_HOST_SERVER || "localhost";
const SERVER_URL = `http://${HOST_SERVER}:8080/api/v1`;

export const makePostRequest = async (path: string, body: Object) => {
  try {
    const res = await axios.post(`${SERVER_URL}${formatUrlPath(path)}`, body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const makePostRequestWithAuth = async (path: string, body: Object) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `${SERVER_URL}${formatUrlPath(path)}`,
      body,
      config,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const makeGetRequestWithAuth = async (path: string) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(`${SERVER_URL}${formatUrlPath(path)}`, config);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const makePatchRequestWithAuth = async (
  path: string,
  body: Object,
  config?: AxiosRequestConfig,
) => {
  try {
    const token = localStorage.getItem("token");
    const customConfig = {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...config?.headers,
      },
    };

    const res = await axios.patch(
      `${SERVER_URL}${formatUrlPath(path)}`,
      body,
      customConfig,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const isAxiosError = (error: any): error is TAxiosError => {
  return (
    (error as TAxiosError).message !== undefined &&
    (error as TAxiosError).name !== undefined &&
    (error as TAxiosError).config !== undefined
  );
};
