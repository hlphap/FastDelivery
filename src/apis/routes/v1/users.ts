import Router from 'express';
import { checkJwt, checkRole, validate } from '../../../middlewares';

import { userControllers } from '../../controllers';
import { createUserSchema, deleteUserSchema, updateUserSchema } from '../../validators/user.validation';

const router = Router();

router.get('/', [checkJwt, checkRole(['ADMINISTRATOR'])], userControllers.getUsers);
router.post('/', [checkJwt, checkRole(['ADMINISTRATOR']), validate(createUserSchema)], userControllers.createUser);
router.put(
    '/:userID',
    [checkJwt, checkRole(['ADMINISTRATOR', 'STANDARD'], true), validate(updateUserSchema)],
    userControllers.updateUser,
);
router.delete(
    '/:userID',
    [checkJwt, checkRole(['ADMINISTRATOR'], true), validate(deleteUserSchema)],
    userControllers.deleteUser,
);

export default router;
