import { Router } from "express";
import { createProduct } from "../controllers/productControllers/createProduct.controller.js";
const router = Router();

router.post('/createProduct', createProduct)

export default router;