import { Router } from 'express';
import { cmStaffControllers } from '../../controllers';

const router = Router();

router.get('/', cmStaffControllers.getCMStaffs);
router.post('/', cmStaffControllers.createCMStaff);
router.put('/:cmStaffID', cmStaffControllers.updateCMStaff);
router.delete('/:cmStaffID', cmStaffControllers.deleteCMStaff);

export default router;
