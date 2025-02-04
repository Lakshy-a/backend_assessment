import { Router } from "express";
import { adminLoginController } from "../controllers/adminControllers/login.controller.js";
import { adminregisterController } from "../controllers/adminControllers/register.controller.js";

const router = Router();

router.post('/register', adminregisterController);
router.post('/login', adminLoginController);

export default router;