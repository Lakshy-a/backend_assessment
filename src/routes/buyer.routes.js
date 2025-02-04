import { Router } from "express";
import { buyerLoginController } from "../controllers/buyerControllers/login.controller.js";
import { buyerRegisterController } from "../controllers/buyerControllers/register.controller.js";

const router = Router();

router.post('/login', buyerLoginController)
router.post('/register', buyerRegisterController)

export default router;