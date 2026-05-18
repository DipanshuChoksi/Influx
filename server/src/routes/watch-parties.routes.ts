import { Router } from 'express';
import { createParty, getInviteUser, getParty, joinParty, removeParticipant, sendInviteUser } from '@/controllers/watch-parties';

const router = Router();

router.post('/', createParty);
router.get('/:roomId', getParty);
router.post('/:roomId/join', joinParty);
router.post('/:roomId/remove', removeParticipant);
router.post('/:roomId/send-invite', sendInviteUser);
router.get('/invites/:userId', getInviteUser);

export default router;
