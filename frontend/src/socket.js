import { io } from "socket.io-client";

import { API_BASE_URL } from "./config";

const enableSocket = import.meta.env.VITE_ENABLE_SOCKET === "true";

const createNoopSocket = () => ({
  on: () => {},
  off: () => {},
  emit: () => {},
  connect: () => {},
  disconnect: () => {},
});

const socket = enableSocket
  ? io(API_BASE_URL, {
      transports: ["websocket", "polling"],
    })
  : createNoopSocket();

export default socket;
