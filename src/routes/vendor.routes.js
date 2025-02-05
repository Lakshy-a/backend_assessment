import { Router } from "express";
import { vendorRegisterController } from "../controllers/vendorControllers/register.controller.js";
import { vendorLoginController } from "../controllers/vendorControllers/login.controller.js";
import { getAllVendors } from "../controllers/vendorControllers/getAllVendors.controller.js";
import { getOneVendor } from "../controllers/vendorControllers/getSpecificVendor.controller.js";

const router = Router();

router.post('/register', vendorRegisterController);
router.post('/login', vendorLoginController);

router.get('/getAllVendors', getAllVendors);
router.get('/getSpecificVendor/:id', getOneVendor);

export default router;