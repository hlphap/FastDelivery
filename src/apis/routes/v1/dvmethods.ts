import { Router } from "express";
import { checkRole } from "middlewares";
import { dvMethodControllers } from "../../controllers";

const router = Router();

router.get("/", dvMethodControllers.getDVMethods);
router.post("/", dvMethodControllers.createDVMethod);
router.put("/:dvMethodID", dvMethodControllers.updateDVMethod);
router.delete("/:dvMethodID", dvMethodControllers.deleteDVMethod);

export default router;
