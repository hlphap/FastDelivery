import { Router } from 'express';
import { warehouseControllers } from '../../controllers';

const router = Router();

router.get('/', warehouseControllers.getWarehouses);
router.post('/', warehouseControllers.createWarehouse);
router.put('/:warehouseID', warehouseControllers.updateWarehouse);
router.delete('/:warehouseID', warehouseControllers.deleteWarehouse);

export default router;
