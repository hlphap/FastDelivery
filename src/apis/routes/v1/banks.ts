import { bankControllers } from "../../controllers";
import { Router } from "express";

const router = Router();

router.get("/", bankControllers.getBanks);

export default router;
