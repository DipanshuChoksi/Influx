import { Router } from 'express';
import { GetUserController, VerifiedUserController } from '@/controllers';

const router = Router();

router.get('/', VerifiedUserController);
router.get('/me', GetUserController);

export default router;
