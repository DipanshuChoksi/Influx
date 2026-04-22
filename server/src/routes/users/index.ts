import { Router } from 'express';
import { GetUserController } from '@/controllers';

const router = Router();

router.get('/', GetUserController);

export default router;
