import { Router } from 'express';
import { cmStoreControllers } from '../../controllers';

const router = Router();

router.get('/', cmStoreControllers.getCMStores);
router.get('/:cmStoreID', cmStoreControllers.getCMStore);
router.post('/', cmStoreControllers.createCMStore);
router.put('/:cmStoreID', cmStoreControllers.updateCMStore);
router.delete('/:cmStoreID', cmStoreControllers.deleteCMStore);

export default router;
