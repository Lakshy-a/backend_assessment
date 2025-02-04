import { Router } from "express";
import { vendorRegisterController } from "../controllers/vendorControllers/register.controller.js";
import { vendorLoginController } from "../controllers/vendorControllers/login.controller.js";

const router = Router();

router.post('/register', vendorRegisterController);
router.post('/login', vendorLoginController);

export default router;