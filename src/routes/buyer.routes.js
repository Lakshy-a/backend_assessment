import { Router } from "express";
import { buyerLoginController } from "../controllers/buyerControllers/login.controller.js";
import { buyerRegisterController } from "../controllers/buyerControllers/register.controller.js";
import { getOneBuyer } from "../controllers/buyerControllers/getSpecificBuyer.controller.js";
import { getAllBuyers } from "../controllers/buyerControllers/getAllBuyers.controller.js";

const router = Router();

router.post('/login', buyerLoginController)
router.post('/register', buyerRegisterController)

router.get('/getAllBuyers', getAllBuyers);
router.get("/getSpecificBuyer/:id", getOneBuyer);

export default router;