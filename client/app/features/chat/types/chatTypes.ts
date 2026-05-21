export interface IMessage {
  createdAt: string;
  message: string;
  receiver: string;
  sender: string;
  updatedAt: string;
}

export interface MessageIncoming {
  content: string;
  user: string;
  time: string;
}
