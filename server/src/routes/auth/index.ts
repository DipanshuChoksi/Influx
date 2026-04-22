import { LoginController, LogoutController, SignupController } from '@/controllers';
import { Router } from 'express';

const router = Router();

router.post('/login', LoginController);
router.post('/signup', SignupController);
router.post('/logout', LogoutController);

export default router;
