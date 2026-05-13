import { Router } from 'express';
import { GetUserController, GetAllUsersController, GetUserByNameController, UpdateUserController } from '@/controllers';

const router = Router();

router.get('/', GetAllUsersController);
router.get('/me', GetUserController);
router.patch('/update', UpdateUserController);
router.get('/:name', GetUserByNameController);

export default router;
