export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
}
