import { Request, Response } from 'express';
import WatchParty from '@/models/watch-parties/watchParties';
import InviteToWatchPartiesModel from '@/models/watch-parties/inviteToWatchParties';

export const createParty = async (req: Request, res: Response) => {
  try {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const user = (req as any).user;
    const hostId = user?.userId;

    const newParty = await WatchParty.create({
      roomId,
      host: hostId || null,
      participants: hostId ? [hostId] : [],
    });

    res.status(201).json({ success: true, data: newParty });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getParty = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const party = await WatchParty.findOne({ roomId }).populate('host participants');

    if (!party) {
      return res.status(404).json({ success: false, message: 'Party not found' });
    }

    res.status(200).json({ success: true, data: party });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendInviteUser = async (req: Request, res: Response) => {
  try {
    const { users, roomId } = req.body;
    if (users.length === 0 || !roomId) {
      return res.status(400).json({ success: false, message: 'User IDs and Room ID are required' });
    }

    const invites = [];
    for (const user of users) {
      const inviteCheck = await InviteToWatchPartiesModel.findOne({ user, watchParty: roomId });

      if (inviteCheck) {
        continue;
      }

      const invite = await InviteToWatchPartiesModel.create({ user, watchParty: roomId });
      invites.push(invite);
    }

    return res.status(200).json({ success: true, data: invites });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const joinParty = async (req: Request, res: Response) => {
  try {
    const { roomId, userId } = req.body;
    const party = await WatchParty.findOneAndUpdate({ roomId }, { $push: { participants: userId } }, { new: true }).populate(
      'host participants'
    );

    if (!party) {
      return res.status(404).json({ success: false, message: 'Party not found' });
    }

    res.status(200).json({ success: true, data: party });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeParticipant = async (req: Request, res: Response) => {
  try {
    const { roomId, userId } = req.body;
    const party = await WatchParty.findOneAndUpdate({ roomId }, { $pull: { participants: userId } }, { new: true }).populate(
      'host participants'
    );

    if (!party) {
      return res.status(404).json({ success: false, message: 'Party not found' });
    }

    res.status(200).json({ success: true, data: party });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getInviteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }
    const invites = await InviteToWatchPartiesModel.find({ user: userId }).populate('watchParty user');

    if (!invites) {
      return res.status(404).json({ success: false, message: 'No invites found' });
    }

    res.status(200).json({ success: true, data: invites });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
