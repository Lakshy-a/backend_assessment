import { Router } from "express";
import { adminLoginController } from "../controllers/adminControllers/login.controller.js";
import { adminRegisterController } from "../controllers/adminControllers/register.controller.js";

const router = Router();

router.post('/register', adminRegisterController);
router.post('/login', adminLoginController);

export default router;