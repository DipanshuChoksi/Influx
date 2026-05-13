import { Router } from 'express';
import { GetUserController, GetAllUsersController, GetUserByNameController } from '@/controllers';

const router = Router();

router.get('/', GetAllUsersController);
router.get('/me', GetUserController);
router.get('/:name', GetUserByNameController);

export default router;
