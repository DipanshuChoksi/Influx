import { Router } from 'express';
import { GetUserController, GetAllUsersController, UpdateUserController, GetUserByIdController } from '@/controllers';

const router = Router();

router.get('/', GetAllUsersController);
router.get('/me', GetUserController);
router.patch('/update', UpdateUserController);
router.get('/:id', GetUserByIdController);

export default router;
