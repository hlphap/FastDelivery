import { Router } from 'express';
import { dvMethodControllers } from '../../controllers';

const router = Router();

router.get('/', dvMethodControllers.getDVMethods);
router.get('/:dvMethodID', dvMethodControllers.getDVMethod);
router.post('/', dvMethodControllers.createDVMethod);
router.put('/:dvMethodID', dvMethodControllers.updateDVMethod);
router.delete('/:dvMethodID', dvMethodControllers.deleteDVMethod);

export default router;
