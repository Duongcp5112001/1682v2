import { io } from "socket.io-client";

export const socket = io("https://mystery-social-7f4a4cc480b5.herokuapp.com", {
  autoConnect: false,
});
