import { Router } from 'express';
import { districtControllers } from '../../controllers';

const router = Router();

router.get('/:districtID/wards', districtControllers.getWardsByDistrict);
router.get('/', districtControllers.getDistricts);

export default router;
