import { MessageModel } from '@/models';

export async function getAllMessages({ senderId, receiverId }: { senderId: string; receiverId: string }) {
  try {
    const messages = await MessageModel.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ createdAt: 1 });
    return messages;
  } catch (error) {
    throw error;
  }
}

export async function createMessage({
  message,
  senderId,
  receiverId,
}: {
  message: string;
  senderId: string;
  receiverId: string;
}) {
  try {
    const newMessage = await MessageModel.create({
      message,
      sender: senderId,
      receiver: receiverId,
    });
    if (!newMessage) {
      throw new Error('Failed to create message');
    }
    return newMessage;
  } catch (error) {
    throw error;
  }
}

export async function deleteMessage(id: string) {
  try {
    const deletedMessage = await MessageModel.findByIdAndDelete(id);
    if (!deletedMessage) {
      throw new Error('Message not found');
    }
    return deletedMessage;
  } catch (error) {
    throw error;
  }
}
