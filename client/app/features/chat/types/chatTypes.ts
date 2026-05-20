export interface Message {
  sender: string;
  message: string;
  createdAt: string;
}

export interface MessageIncoming {
  content: string;
  user: string;
  time: string;
}
