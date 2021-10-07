import { Router } from 'express';
import { orderControllers } from '../../controllers';

const router = Router();

router.patch('/handle', orderControllers.orderNotYetHandle);
router.get('/fee', orderControllers.calcFee);
router.get('/statistics', orderControllers.statistics);
router.put('/:orderID/status', orderControllers.updateOrder);
router.get('/', orderControllers.getOrders);
router.post('/', orderControllers.createOrder);
router.put('/:orderID', orderControllers.updateOrder);
router.delete('/:orderID', orderControllers.deleteOrder);

export default router;
