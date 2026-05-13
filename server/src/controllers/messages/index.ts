import { getAllMessages, createMessage, deleteMessage } from '@/repositories/message';
import { Request, Response } from 'express';
import { HttpStatusCode } from '@/types';

export async function getMessages(req: Request, res: Response) {
  try {
    const { senderId, receiverId } = req.query;
    if (!senderId || !receiverId) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        error: 'senderId and receiverId are required',
      });
    }
    const messages = await getAllMessages({
      senderId: senderId as string,
      receiverId: receiverId as string,
    });
    return res.status(HttpStatusCode.OK).json({ success: true, messages });
  } catch (error) {
    console.error('Error in getMessages controller:', error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: 'Internal server error',
    });
  }
}

export async function createMessageController(req: Request, res: Response) {
  try {
    const { message, senderId, receiverId } = req.body;
    const newMessage = await createMessage({ message, senderId, receiverId });
    return res.status(HttpStatusCode.CREATED).json({ success: true, newMessage });
  } catch (error) {
    console.error('Error in createMessage controller:', error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: 'Internal server error',
    });
  }
}

export async function deleteMessageController(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const deletedMessage = await deleteMessage(id);
    return res.status(HttpStatusCode.OK).json({ success: true, deletedMessage });
  } catch (error) {
    console.error('Error in deleteMessage controller:', error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
