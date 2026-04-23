import socket from "socket.io-client";

export function initSocket() {
  return socket("http://localhost:5000");
}
