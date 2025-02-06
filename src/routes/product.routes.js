import { Router } from "express";
import { createProduct } from "../controllers/productControllers/createProduct.controller.js";
import { getAllProducts } from "../controllers/productControllers/getAllProducts.controller.js";
const router = Router();

router.post('/createProduct', createProduct)
router.get('/getAllProducts', getAllProducts)

export default router;