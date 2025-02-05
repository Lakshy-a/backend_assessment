import { Router } from "express";
import { staffRegisterController } from "../controllers/staffControllers/register.controller.js";
import { staffLoginController } from "../controllers/staffControllers/login.controller.js";
import { getAllStaff } from "../controllers/staffControllers/getAllStaff.controller.js";
import { getSpecificStaff } from "../controllers/staffControllers/getSpecificStaff.controller.js";

const router = Router();

router.post('/register', staffRegisterController);
router.post('/login', staffLoginController);

router.get('/getAllStaff', getAllStaff);
router.get("/getSpecificStaff/:id", getSpecificStaff);

export default router;