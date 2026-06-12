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

// Empty string → socket.io connects to current origin (correct for same-server prod)
const socketUrl = API_BASE_URL || undefined;

const socket = enableSocket
  ? io(socketUrl, { transports: ["websocket", "polling"] })
  : createNoopSocket();

export default socket;
