import { Router } from 'express';
import { statusControllers } from '../../controllers';

const router = Router();

router.get('/:statusID/next', statusControllers.getNextStatus);
router.get('/', statusControllers.getStatus);

export default router;
