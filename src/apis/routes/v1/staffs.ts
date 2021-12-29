import { Router } from 'express';
import { staffControllers } from '../../controllers';

const router = Router();

router.get('/', staffControllers.getStaffs);
router.get('/staff-deliveries', staffControllers.getStaffDeliveries);
router.get('/:staffID', staffControllers.getStaff);
router.post('/login', staffControllers.login);
router.post('/', staffControllers.createStaff);
router.put('/:staffID', staffControllers.updateStaff);
router.delete('/:staffID', staffControllers.deleteStaff);
router.get('/:staffID/orders', staffControllers.getOrdersFromStaff);
router.put('/:staffID/orders/:orderID', staffControllers.updateStatus);

export default router;
