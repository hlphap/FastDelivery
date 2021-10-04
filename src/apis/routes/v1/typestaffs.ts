import { Router } from 'express';
import { typeStaffControllers } from '../../controllers';

const router = Router();

router.get('/', typeStaffControllers.getTypeStaffs);

export default router;
