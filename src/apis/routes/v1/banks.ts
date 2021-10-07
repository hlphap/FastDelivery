import { Router } from 'express';
import { bankControllers } from '../../controllers';

const router = Router();

router.get('/', bankControllers.getBanks);

export default router;
