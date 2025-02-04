import { Router } from "express";
import { staffRegisterController } from "../controllers/staffControllers/register.controller.js";
import { staffLoginController } from "../controllers/staffControllers/login.controller.js";

const router = Router();

router.post('/register', staffRegisterController);
router.post('/login', staffLoginController);

export default router;