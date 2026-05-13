import { Router } from 'express';
import { getMessages, createMessageController, deleteMessageController } from '@/controllers/messages';

const router = Router();

router.get('/', getMessages);
router.post('/', createMessageController);
router.delete('/', deleteMessageController);

export default router;
