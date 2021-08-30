import Router from "express-promise-router";
import { WardControllers } from "../app/controllers";

const router = Router();

router.route("/:districtID")
    .get(WardControllers.getWardOfDistrict);

export default router;
